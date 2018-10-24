
<template>
  <div id="app">
    <Header />
    <router-view/>
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

<style>
  @import 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
  @import '~sanitize.css';
  @import './assets/variables.css';


  body {
    overflow-x: hidden;
  }
  .container {
    display: block;
    padding: 1.5rem;
    padding-top: 7.2rem;
    min-height: 100%;
  }
  #app {
    min-height: 100vh;
  }
  h2 {
    color: var(--color-main);
    font-size: 2.5rem;
    font-weight: 700;
    margin-top: 0;
  }

</style>
