<template>
  <main id="risk-analysis">
    <form-risk-analysis />
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
      @media(min-width: 60rem){
        padding-top: 0;
      }
    }
    .risk-indication-bar {
      position: fixed;
      bottom: 0;
      left: 0;
      @media(min-width: 60rem){
        box-shadow: none;
        left: 10rem;
        padding: 1rem 6rem 2rem;

      }

      width: 100%;
      background-color: white;
      padding: 0.5rem 1.5rem;
      box-shadow: 0px -3px 5px 0px var(--boxshadow-standard);
    }
  }

</style>
