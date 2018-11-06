
<template>
  <div id="app">
    <Header />
    <div class="page-holder">
      <router-view/>
    </div>

  </div>
</template>

<script>
import Header from './components/organisms/Header.vue'
export default {
  name: 'app',
  components: {
    Header
  }
}
</script>

<style lang="scss">
  @import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
  @import '~sanitize.css';
  @import './assets/variables.css';
  @import './assets/forms';

  body {
    overflow-x: hidden;
  }
  .container {
    display: block;
    padding: 1.5rem;
    padding-top: calc(4rem + 3.125rem);
    min-height: 100%;
    margin: 0 auto;
    @media screen and (min-width: 40rem){
      margin: 0 3rem;
      padding-left: 3rem;
      padding-right: 3rem;
    }
    @media screen and (min-width: 60rem){
      padding-top: 4rem;
    }
  }
  #app {
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  button {
    background: 0;
    border: 0;
    padding: 0;
  }
  h2 {
    color: var(--color-main);
    font-size: 2.5rem;
    font-weight: 700;
    margin-top: 0;
  }
  a {
    text-decoration: none;
    outline: none;
    color: inherit;
  }
  p {
    color: var(--color-grey);
    line-height: 1.5;
  }
  .center {
    text-align: center;
  }
  figure {
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  @media screen and (min-width: 60rem) {
    main {
      padding-left: 10rem;
    }
  }

</style>
