<template>
  <div class="clients-list">
    <card-client v-for="(client, index) in clients" :client="client"  :key="index"/>
  </div>
</template>

<script>
import CardClient from '../molecules/CardClient.vue'
export default {
  name: 'ClientsList',
  data(){
    return {
    }
  },
  props: ['clients'],
  components: {
    CardClient
  }

}
</script>

<style lang="scss" scoped>
  .clients-list {
    // max-width: 60rem;
    display: flex;
    // flex-direction: column;
    // align-items: center;
    flex-wrap: wrap;
    padding-top: 1rem;
    .client {
      @media screen and (min-width: 42rem) {
        margin-right: 1rem;
      }
    }
  }

</style>
