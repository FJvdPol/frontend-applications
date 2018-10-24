<template>
  <main>
    <div class="container">
      <h2>Cliënten</h2>
      <ClientsList :clients="clients"/>
      <AddClientBar />
    </div>

  </main>

</template>

<script>
import ClientsList from '../organisms/ClientsList.vue'
import AddClientBar from '../molecules/AddClientBar.vue'

export default {
  name: 'PageClients',
  data(){
    return {
      clients: [
        {name: 'Henk', img: 'https://unsplash.it/400/400'},
        {name: 'Pieter'},
        {name: 'Johan'}
      ]
    }
  },
  components: {
    ClientsList,
    AddClientBar
  }
}
</script>

<style lang="scss">
  .container {
    padding-bottom: 7rem;
  }
</style>
