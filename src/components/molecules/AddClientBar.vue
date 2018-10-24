<template>
  <div class="add-bar">
    <button>Voeg cliënt toe</button>
  </div>

</template>

<script>
export default {
  name: 'AddClient',
  data(){
    return {}
  }
}
</script>

<style lang="scss">
  .add-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.5rem;
    box-shadow: 0px -3px 5px 0px rgba(0,0,0,0.05);
    button {
      background: 0;
      border: 0;
      color: var(--color-main);
    }
  }
</style>
