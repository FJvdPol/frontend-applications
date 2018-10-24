<template>
  <main>
    <div class="container">
      <h2>Hallo <span>{{$route.params.name}}</span></h2>
    </div>
  </main>
</template>

<script>
export default {
  name: 'SingleClient',
  data(){
    return {}
  }
}
</script>

<style lang="scss">
  h2 {
    span {
      text-transform: capitalize;
    }
  }
</style>
