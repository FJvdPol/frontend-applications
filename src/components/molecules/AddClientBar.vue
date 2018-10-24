<template>
  <div class="add-bar">
    <button aria-label="Voeg cliënt toe"> <i class="fa fa-user-plus"></i> </button>
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
    padding: 1rem;
    box-shadow: 0px -3px 5px 0px rgba(0,0,0,0.05);
    button {
      background: 0;
      border: 0;
      cursor: pointer;
      i {
        font-size: 2rem;
        background: var(--gradient-bg);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
  @media screen and (min-width: 40rem){
    .add-bar {
      margin-top: 3rem;
      position: relative;
      width: 5rem;
      height: 4rem;
      padding: 0;
      box-shadow: 0px 3px 7px 0px rgba(0,0,0,0.1);
      button {
        align-self: stretch;
        width: 100%;
      }
    }

  }
</style>
