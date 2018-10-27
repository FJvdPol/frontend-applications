<template>
  <main>
    <div class="container">
      <h2>Cliënten</h2>
      <ClientsList :clients="clients"/>
      <!-- <AddClientBar /> -->
    </div>

  </main>

</template>

<script>
import ClientsList from '../organisms/ClientsList.vue'
import AddClientBar from '../atoms/AddClientBar.vue'

export default {
  name: 'PageClients',
  data(){
    return {
      clients: [
        {
          name: 'Henk',
          lastname: 'de Vries',
          img: '/assets/images/test_person_image.jpg',
          info: {
            "Leeftijd": 12,
            "Stad": 'Amsterdam',
            "Postcode": '1112PT',
          },
          risk: 1.03
        },
        {
          name: 'Pieter'
        },
        {
          name: 'Johan',
          risk: 7.60
        }
      ]
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
