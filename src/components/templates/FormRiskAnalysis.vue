<template>
  <div class="form-holder">
    <TabNavigation :tabs="getCategories()" :listenTo="'riskindication-form-next'"/>
    <AnalysisBody @valueChange="updateWeights" :questionsByCategory="getQuestionsByCategory()" :categories="getCategories()"/>
    <div class="risk-indication-bar">
      <RiskIndication :percentage="percentage" />
    </div>
  </div>
</template>

<script>
import json from '../../assets/data.json'
import TabNavigation from '../organisms/TabNavigation.vue'
import AnalysisBody from '../organisms/AnalysisBody.vue'
import RiskIndication from '../atoms/RiskIndication.vue'

export default {
  name: 'PageRiskAnalysis',
  data() {
    return {
      file: json,
      weights: [],
      percentage: 0,
      nextPageIndex: 0
    }
  },
  components: {
    TabNavigation,
    AnalysisBody,
    RiskIndication
  },
  methods: {
    getCategories() {
      return (
        this.file
          .map(questionObject => questionObject['category'])
          .filter((category, firstTime, categories) => {
            // return alleen unieke categorieën, geen dubbele
            if (categories.indexOf(category) == firstTime) {
              return category
            }
          })
      )
    },
    getQuestionsByCategory() {
      let categories = this.getCategories()
      let questionsByCategory = []
      categories.forEach(category => {
        questionsByCategory.push(
          this.file
            .filter((object) => object.category === category)
        )
      })
      return (
        questionsByCategory
      )
    },
    calcRiskIndication() {
      if (this.weights.length == 0){
        let weights = this.weights.slice()
        for (var i = 0; i < this.file.length; i++) {
          weights.push(0)
        }
        this.weights = weights
      }
      let sum = this.weights.reduce((acc, cur) => acc + cur)
      return ( 1 / ( 1 + Math.exp( -1 * ( -8.57219 + sum ) ) ) * 100 ).toFixed( 2 )
    },
    updateWeights(data) {
      this.weights[data.id] = data.value
      this.percentage = this.calcRiskIndication()
    }
  }
}
</script>

<style lang="scss">
</style>
