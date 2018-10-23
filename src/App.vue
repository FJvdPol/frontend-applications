

<template>
  <div id="app">
    <Header />
    <div class="container">
      Initial commit
    </div>
  </div>
</template>

<script>

import Header from './components/Header.vue'
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
    padding: 1rem;
    padding-top: 5.2rem;
  }
  #app {
    min-height: 100vh;
  }

</style>
