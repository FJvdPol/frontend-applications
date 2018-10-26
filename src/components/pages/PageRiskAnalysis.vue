<template>
  <main id="risk-analysis">
    <FormRiskAnalysis />
  </main>
</template>

<script>

import FormRiskAnalysis from '../templates/FormRiskAnalysis.vue'

export default {
  name: 'PageRiskAnalysis',
  data() {
    return {}
  },
  components: {
    FormRiskAnalysis
  }
}
</script>

<style lang="scss">
  #risk-analysis {
    .form-holder {
      padding-top: 3.125rem;
    }
    .risk-indication-bar {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: white;
      padding: 0.5rem 1.5rem;
      box-shadow: 0px -3px 5px 0px rgba(0,0,0,0.05);
    }
  }

</style>
