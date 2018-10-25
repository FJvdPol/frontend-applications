<template>
  <div class="form-holder">
    <TabNavigation :tabs="getCategories()" :listenTo="'riskindication-form-next'"/>
    <AnalysisBody @valueChange="updateWeights" :questionsByCategory="getQuestionsByCategory()" :categories="getCategories()"/>
    <RiskIndicationBar :percentage="percentage" />
  </div>
</template>

<script>
import json from '../../assets/data.json'
import TabNavigation from '../organisms/TabNavigation.vue'
import AnalysisBody from '../organisms/AnalysisBody.vue'
import RiskIndicationBar from '../atoms/RiskIndicationBar.vue'

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
    RiskIndicationBar
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
  .form-holder {
    padding-top: 3.125rem;
    #tab-nav {
      #tab-bg {
        background-color: var(--color-ultra-light)
      }
    }
  }
  .container {
    padding-top: 2rem;
  }

</style>
