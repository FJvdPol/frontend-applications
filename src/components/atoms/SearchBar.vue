<template lang="html">
  <form @submit.prevent :class="open ? 'open' : ''">
    <input id="search-input" v-model="value" type="text" @blur="toggleNav">
    <button id="search-button" @click="toggleNav" type="submit"><i class="fa fa-search"></i></button>
  </form>

</template>

<script>

export default {
  name: 'SearchBar',
  props: ['action'],
  data(){
    return {
      open: false,
      value: ''
    }
  },
  methods: {
    toggleNav() {
      if (this.open) {
        document.querySelector('#search-input').blur()
      } else {
        document.querySelector('#search-input').focus()
      }
      this.open = !this.open
      this.action ? this.action() : false
    }
  },
  watch: {
    value(value) {
      this.open ? this.$emit('valueChange', value) : false
      this.value ? document.querySelector('#search-button').classList.add('has-value') : document.querySelector('#search-button').classList.remove('has-value')
    }
  }
}
</script>

<style lang="scss" scoped>
  form {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    z-index: 1;
  }
  button {
    height: 2.5rem;
    outline: none;
    padding-right: 1.5rem;
    cursor: pointer;
    i {
      color: white;
      font-size: 1.25rem;
      transition: all 0.3s ease-in-out;
    }
    &.has-value {
      i {
        color: var(--color-light);
      }
    }
  }
  .open {
    button {
      i {
        font-size: 1.5rem;
      }
    }
    input {
      opacity: 1;
      pointer-events: all;
      transform: translateY(0)
    }
  }
  input {
    color: white;
    transform: translateY(-1rem);
    opacity: 0;
    pointer-events: none;
    border: 2px solid transparent;
    border-radius: 0;
    margin: 0 1.5rem;
    background: transparent;
    border-bottom-color: white;
    box-shadow: none;
    transition: all 0.3s ease-in-out;
    padding: 1rem 0 0.5rem;
  }
</style>
