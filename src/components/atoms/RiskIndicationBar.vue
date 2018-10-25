<template>
  <div class="risk-indication-bar">
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
  .risk-indication-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: white;
    display: flex;
    align-items: center;
    padding: 0.5rem 1.5rem;
    box-shadow: 0px -3px 5px 0px rgba(0,0,0,0.05);
    h3 {
      color: var(--color-main);
      font-size: 2.5rem;
      margin: 0;
      margin-right: 0.5rem;
      &.light {
        color: var(--color-ultra-light);
      }
      &.medium {
        color: var(--color-light);
      }
      &.high {
        color: var(--color-main);
      }
    }
    p {
      color: var(--color-grey);
      font-size: 0.875rem;
      max-width: 7rem;
    }

  }
</style>
