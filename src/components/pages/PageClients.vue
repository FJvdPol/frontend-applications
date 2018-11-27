<template>
  <main>
    <div class="container">
      <h2>Cliënten</h2>
      <div class="loader" v-if="clients == null && !error">
        <loader-card />
        <loader-card />
      </div>

      <p v-if="error">Iets ging fout: {{error.status}} {{error.message}}</p>
      <clients-list v-else :clients="clients"/>
      <!-- <AddClientBar /> -->
    </div>

  </main>

</template>

<script>
import ClientsList from '../organisms/ClientsList.vue'
import LoaderCard from '../loaders/LoaderCard.vue'
import AddClientBar from '../atoms/AddClientBar.vue'
import ClientService from '../../services/client.js'

export default {
  name: 'PageClients',
  data(){
    return {
      clients: null,
      error: null
    }
  },
  async mounted() {
    setTimeout(() => {
      const response = ClientService.getAll()
      if (response.status === 200) {
        return this.clients = response.data.clients
      }
      const fakeClients = [
        {
          name: 'johan',
          lastname: 'de vries',
          id: 0,
          img: 'https://unsplash.it/500/500',
          formdata: null,
          risk: 0
        },
        {
          name: 'sara',
          lastname: 'de jong',
          id: 1,
          img: 'https://unsplash.it/600/600',
          formdata: null,
          risk: 0
        }
      ]
      fakeClients.forEach(client => ClientService.create(client))
      this.clients = ClientService.getAll().data.clients
    }, 3000)

  },
  components: {
    ClientsList,
    AddClientBar,
    LoaderCard
  }
}
</script>

<style lang="scss" scoped>
  .container {
    padding-bottom: 7rem;
  }
  .loader {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding-top: 1rem;
    .client {
      margin-right: 1rem;
    }
  }
</style>
