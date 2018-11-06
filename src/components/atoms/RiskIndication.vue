<template>
  <div class="risk-indication-holder">
    <h3 :class="riskSevereness()">{{percentage}}%</h3>
    <p>kans op een zware maatregel</p>
  </div>

</template>

<script>
export default {
  name: 'RiskIndicationBar',
  data(){
    return {}
  },
  props: ['percentage'],
  methods: {
    riskSevereness(){
      if (this.percentage <= 2){
        return 'light'
      } else if (this.percentage < 5 && this.percentage > 2) {
        return 'medium'
      }
      return 'high'
    }
  }
}
</script>

<style lang="scss" scoped>
  .risk-indication-holder {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  h3 {
    color: var(--color-main);
    font-size: 2.5rem;
    margin: 0;
    margin-right: 0.5rem;
    &.light {
      color: var(--color-light);
    }
    &.medium {
      color: var(--color-main);
    }
    &.high {
      color: var(--color-dark);
    }
  }
  p {
    margin: 0;
    color: var(--color-grey);
    font-size: 0.875rem;
    max-width: 7rem;
  }

</style>
