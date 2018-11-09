<template>
  <main id="home">
    <div class="container">
      <h2>Kind veilig thuis</h2>
      <h3>Risico analyse app</h3>
      <img src="/assets/images/undraw_data_report.svg" alt="">
      <router-link v-if="!$store.state.user" :to="{name: 'login'}">
        <Button :textContent="'log in'"/>
      </router-link>
      <router-link v-if="$store.state.user" :to="{name: 'clients'}">
        <Button :textContent="'Cliënten'"/>
      </router-link>
    </div>
  </main>
</template>

<script>
import Button from '../atoms/Button.vue'
export default {
  name: 'home',
  components: {
    Button
  }
}
</script>

<style lang="scss" scoped>
  main {
    background-color: white;
    min-height: 100vh;
  }
  h3 {
    color: var(--color-light);
  }
  img {
    max-width: 30rem;
    display: block;
    width: 70%;
    margin: 4rem auto 0;
  }
  @media screen and (min-width: 60rem){
    img {
      width: 15rem;
      margin: 4rem 0;
    }
  }


</style>
