<template>
  <div class="form-holder">
    <div :class="openNav ? 'navigation-holder grow-nav' : 'navigation-holder'">
      <router-link :to="{ path: '/clienten/' + client.id }">
        <h2>{{client.name}} {{client.lastname}}</h2>
      </router-link>
      <search-bar :action="growNav" @valueChange="applySearchQuery"/>
      <tab-navigation :tabs="categories"/>
    </div>
    <analysis-body @valueChange="updateSelected" @saveForm="updateClient" :questionsByCategory="questionsByCategory" :categories="getCategories()"/>
    <div class="risk-indication-bar">
      <risk-indication :percentage="percentage" />
    </div>
  </div>
</template>

<script>
import json from '../../assets/data.json'
import TabNavigation from '../organisms/TabNavigation.vue'
import AnalysisBody from '../organisms/AnalysisBody.vue'
import RiskIndication from '../atoms/RiskIndication.vue'
import SearchBar from '../atoms/SearchBar'
import ClientService from '../../services/client-service.js'

export default {
  name: 'PageRiskAnalysis',
  data() {
    return {
      file: json,
      selected: [],
      percentage: 0,
      client: {},
      nextPageIndex: 0,
      openNav: false,
      searchQuery: '',
      categories: [],
      questionsByCategory: [],
      error: {}
    }
  },
  components: {
    TabNavigation,
    AnalysisBody,
    RiskIndication,
    SearchBar
  },
  mounted() {
    if (sessionStorage.getItem('client')) {
      this.client = JSON.parse(sessionStorage.getItem('client'))
      if (typeof this.client.formdata == "string"){
        this.client.formdata = JSON.parse(this.client.formdata)
      }
      this.questionsByCategory = this.getQuestionsByCategory()
      this.categories = this.getCategories()
    }
  },
  methods: {
    growNav() {
      this.openNav = !this.openNav
    },
    applySearchQuery(value) {
      this.searchQuery = value.toLowerCase()
      this.questionsByCategory = this.getQuestionsByCategory()
      this.categories = this.getCategories()
    },
    getCategories() {
      return (
        this.file
          .filter(obj => this.searchQuery ? obj.question.toLowerCase().indexOf(this.searchQuery) > -1 : true)
          .map(questionObject => {
            return questionObject['category']
          })
          .filter((category, firstTime, categories) => {
            // return alleen unieke categorieën, geen dubbele
            if (categories.indexOf(category) == firstTime) {
              return category
            }
          })
      )
    },
    getQuestionsByCategory() {
      // get list of all categories
      let categories = this.getCategories()
      let questionsByCategory = []
      // for every category, get all the questionObjects that have it's name as value of category key
      categories.forEach(category => {
        questionsByCategory.push(
          this.file
            .filter(obj => this.searchQuery ? obj.question.toLowerCase().indexOf(this.searchQuery) > -1 : true) // remove objects that don't contain searchquery in question key
            .filter((object) => object.category === category)
        )
      })
      if (this.client.formdata) { // if client has formdata in the database
        // this.percentage = client.risk
        let data = this.client.formdata // get formdata
        questionsByCategory.forEach(category => { // send which parts of the form have already been set
          category.forEach(questionObj => {
            data.id.forEach((id, index) => questionObj.id == id ? questionObj.setval = data.value[index] : false)
          })
        })
      } else {
        this.client.formdata = {id: [], value: []}
      }
      this.percentage = this.calcRiskIndication()
      return questionsByCategory
    },
    calcRiskIndication() {
      if (this.client.formdata){
        if (this.client.formdata.value.length == 0) {
          return 0
        }
        let sum = this.client.formdata.value.reduce((acc, cur) => acc + cur)
        return ( 1 / ( 1 + Math.exp( -1 * ( -8.57219 + sum ) ) ) * 100 ).toFixed( 2 )
      }
    },
    updateSelected(selected) {
      let alreadyIn = false
      let saved = this.client.formdata
      saved.id.forEach((id, index) => {
        if (selected.id == id) {
          saved.value[index] = selected.value
          alreadyIn = true
        }
      })

      if (!alreadyIn) {
        saved.id.push(selected.id)
        saved.value.push(selected.value)
      }
      this.client.formdata = saved
      this.percentage = this.calcRiskIndication()
      let client = this.client
      client.risk = this.percentage
      client.formdata = this.client.formdata
      JSON.stringify(client.formdata)
      sessionStorage.setItem('client', JSON.stringify(client))
    },
    async updateClient(){
      if (!this.client) {
        return
      }
      try {
        let client = this.client
        client.risk = this.percentage
        client.formdata = JSON.stringify(this.client.formdata)
        await ClientService.update(this.client.id, {client: client})
        this.$router.push({path: '/clienten/' + this.client.id})
      } catch(e) {
        if (e.response){
          this.error = {
            status: e.response.status,
            message: e.response.data.error,
          }
        } else {
          this.error = {
            else: true,
            message: 'Er kon geen verbinding met internet gemaakt worden'
          }
        }
      }

    }
  }
}
</script>

<style lang="scss">
  .navigation-holder {
    position: relative;
    h2 {
      z-index: 1;
      top: 1rem;
      left: 1.5rem;
      position: absolute;
      color: var(--color-light);
      font-weight: 500;
      font-size: 1rem;
      transition: all 0.3s;
    }
    @media(min-width: 60rem){
      form {
        max-width: 20rem;
        left: auto;
        right: 0;
      }
    }

    &.grow-nav {
      #tab-nav {
        height: 9rem;
        @media(min-width: 60rem){
          height: 8rem;
        }
      }
      h2 {
        opacity: 0;
        @media(min-width: 60rem){
          opacity: 1;
        }
      }
    }
    #tab-nav {
      transition: all 0.3s ease-in-out;
      height: 7rem;
    }
  }
</style>
