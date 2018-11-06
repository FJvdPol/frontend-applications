<template>
  <div class="form-holder">
    <div :class="openNav ? 'navigation-holder grow-nav' : 'navigation-holder'">
      <h2>{{this.client.name}} {{this.client.lastname}}</h2>
      <search-bar :action="growNav" @valueChange="applySearchQuery"/>
      <tab-navigation :tabs="getCategories()"/>
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
      questionsByCategory: []
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
      this.client.formdata = JSON.parse(this.client.formdata)
      this.questionsByCategory = this.getQuestionsByCategory()
      this.categories = this.getCategories()
    }
  },
  methods: {
    growNav() {
      this.openNav = !this.openNav
    },
    applySearchQuery(value) {
      console.log('firing searchQuery');
      this.searchQuery = value.toLowerCase()
      this.questionsByCategory = this.getQuestionsByCategory()
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
      console.log('in getQuestions: ', this.client.formdata.id);
      return questionsByCategory
    },
    calcRiskIndication() {
      console.log('firing this');
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
      console.log('id array: ', saved.id, this.client.formdata)
      saved.id.forEach((id, index) => {
        if (selected.id == id) {
          saved.value[index] = selected.value
          alreadyIn = true
        }
      })

      if (!alreadyIn) {
        saved.id.push(event.id)
        saved.value.push(event.value)
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
        console.log('updating client');
        let client = this.client
        client.risk = this.percentage
        client.formdata = this.client.formdata
        JSON.stringify(client.formdata)
        const updatedClient = await ClientService.update(this.client.id, {client: client})
        this.$router.push({path: '/clienten/' + this.client.id})
      } catch(e) {
        console.log(e)
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
    &.grow-nav {
      #tab-nav {
        height: 9rem;
      }
      h2 {
        opacity: 0;
      }
    }
    #tab-nav {
      transition: all 0.3s ease-in-out;
      height: 7rem;
    }
  }
</style>
