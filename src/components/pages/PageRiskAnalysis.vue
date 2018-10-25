<template>
  <main>
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

<style lang="scss" scoped>
  .form-holder {
    padding-top: 0;
  }

</style>
