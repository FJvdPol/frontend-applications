<template>
  <main>
    <div class="container">
      <h2>Cliënten</h2>
      <p v-if="clients == null && !error">Cliëntenlijst aan het laden....</p>
      <p v-if="error">Iets ging fout: {{error.status}} {{error.message}}</p>
      <clients-list :clients="clients"/>
      <!-- <AddClientBar /> -->
    </div>

  </main>

</template>

<script>
import ClientsList from '../organisms/ClientsList.vue'
import AddClientBar from '../atoms/AddClientBar.vue'
import ClientService from '../../services/client-service.js'

export default {
  name: 'PageClients',
  data(){
    return {
      clients: null,
      error: null
    }
  },
  async mounted() {
    try {
      this.clients = (await ClientService.getAll()).data.clients
    } catch (e) {
      if (e.response){
        this.error = {}
        this.error.status = e.response.status
        this.error.message = e.response.data.error
      } else {
        console.log(e);
      }

    }
  },
  components: {
    ClientsList,
    AddClientBar
  }
}
</script>

<style lang="scss" scoped>
  .container {
    padding-bottom: 7rem;
  }
</style>
