<template>
  <div class="form-holder">
    <div :class="openNav ? 'navigation-holder grow-nav' : 'navigation-holder'">
      <router-link :to="{ path: '/clienten/' + client.id }">
        <h2>{{client.name}} {{client.lastname}}</h2>
      </router-link>
      <search-bar :action="growNav" @valueChange="applySearchQuery"/>
      <tab-navigation :tabs="types"/>
    </div>
    <analysis-body @valueChange="updateSelected" @saveForm="updateClient" :questions="questions" :types="types"/>
    <div class="risk-indication-bar">
      <risk-indication :percentage="percentage" />
    </div>
  </div>
</template>

<script>
import TabNavigation from '../organisms/TabNavigation.vue'
import AnalysisBody from '../organisms/AnalysisBody.vue'
import RiskIndication from '../atoms/RiskIndication.vue'
import SearchBar from '../atoms/SearchBar'
import Client from '../../services/client.js'
import Questions from '../../services/questions.js'


export default {
  name: 'PageRiskAnalysis',
  data() {
    return {
      selected: [],
      percentage: 0,
      client: {},
      nextPageIndex: 0,
      openNav: false,
      searchQuery: '',
      types: [],
      questions: [],
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
      this.questions = this.getQuestions()
      this.types = Questions.key('type')
    }
  },
  methods: {
    growNav() {
      this.openNav = !this.openNav
    },
    applySearchQuery(value) {
      value = value.toLowerCase()
      this.questions = this.getQuestions(value)
      this.types = Questions.key('type', value)
    },
    getQuestions(search = '') {
      const questions = Questions.byType(search)
      if (!this.client.formdata) {
        this.client.formdata = []
        this.percentage = this.calcRiskIndication()
        return questions
      }
      this.percentage = this.client.risk
      const data = this.client.formdata
      // check which questions have already been filled in before
      // if so, set their initial value to the previously set value
      const savedQuestions = questions.map(type =>
        type.map(category =>
          category.map(question => {
            const existing = data.find(obj => obj.id === question.id)
            return !existing
              ? question
              : {
                  ...question,
                  setval: existing.value
                }
          })
        )
      )
      return savedQuestions
    },
    calcRiskIndication() {
      if (this.client.formdata){
        if (this.client.formdata.length == 0) {
          return 0
        }
        const sum = this.client.formdata
          .map(obj => obj.value)
          .reduce((acc, cur) => acc + cur)
        return ( 1 / ( 1 + Math.exp( -1 * ( -8.57219 + sum ) ) ) * 100 ).toFixed( 2 )
      }
    },
    updateSelected(selected) {
      const saved = this.client.formdata
      // check if question has been anwsered before. If so, change it's saved value, otherwise, save the question and current value.
      const index = saved.findIndex(obj => selected.id === obj.id)
      index > -1
        ? saved[index].value = selected.value
        : saved.push(selected)
      this.client.formdata = saved
      this.percentage = this.calcRiskIndication()
      const client = {...this.client, risk: this.percentage, formdata: JSON.stringify(this.client.formdata)}
      sessionStorage.setItem('client', JSON.stringify(client))
    },
    updateClient(){
      if (!this.client) return
      const client = {...this.client, risk: this.percentage, formdata: JSON.stringify(this.client.formdata)}
      const response = Client.update(client.id, client)
      response.status === 200
        ? this.$router.push({path: '/clienten/' + client.id})
        : this.error = {
            status: response.status,
            message: response.error
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
      text-transform: capitalize;
    }
    #tab-nav {
      #tab-bg {
        width: 3.75rem;
      }
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
