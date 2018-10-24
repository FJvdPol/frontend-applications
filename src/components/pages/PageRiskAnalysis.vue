<template>
  <main>
    <AnalysisNavigation :categories="getCategories()"/>
    <!-- <div class="container">
      Content
    </div> -->
    <router-view />
  </main>

</template>

<script>
import json from '../../assets/data.json'
import AnalysisNavigation from '../molecules/AnalysisNavigation.vue'
export default {
  name: 'PageRiskAnalysis',
  data() {
    return {
      file: json
    }
  },
  components: {
    AnalysisNavigation
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
    }
  }
}
</script>

<style lang="scss" scoped>
  main {
    padding-top: 3.125rem;
  }
  .container {
    padding-top: 2rem;
  }

</style>
