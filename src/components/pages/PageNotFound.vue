<template>
  <main id="page-not-found">
    <div class="container">

      <h2>Oeps!</h2>
      <h3>Het lijkt erop dat je verdwaald bent...</h3>
      <img src="/assets/images/undraw_lost.svg" alt="">
      <router-link to="/">
        <Button :textContent="'naar home'"/>
      </router-link>
    </div>
  </main>
</template>

<script>
import Button from '../atoms/Button.vue'
export default {
  name: 'PageNotFound',
  components: {
    Button
  }
}
</script>

<style lang="scss" scoped>
  h3 {
    color: var(--color-light);
  }
  img {
    max-width: 30rem;
    display: block;
    width: 70%;
    margin: 3rem auto 0;
    @media screen and (min-width: 40rem){
      margin-left: 0;
    }
  }
  button {
    margin-bottom: 0;
    @media screen and (min-width: 40rem){
      margin-left: 0;
    }
  }


</style>
