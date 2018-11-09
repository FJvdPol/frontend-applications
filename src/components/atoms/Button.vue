<template>
  <button class="button">{{textContent}}</button>
</template>

<script>
export default {
  name: 'Button',
  data() {
    return {}
  },
  props: ['textContent']
}
</script>

<style lang="scss">
  .button {
    cursor: pointer;
    display: block;
    background: 0;
    background: var(--gradient-bg);
    // background: white;
    border: 0;
    // border: 1px solid var(--color-light);
    border-radius: 100px;
    padding: 1rem 2.5rem;
    color: white;
    // color: var(--color-light);
    @media(min-width: 40rem) {
      margin-left: 0;
    }
    font-weight: 500;
    margin: 3rem auto;
    box-shadow: 0px 12px 40px -5px var(--boxshadow-standard);
    &:focus, &:active {
      outline: none;
      background: var(--color-light);
    }
    &.secondary {
      background: transparent;
      border: 1px solid transparent;
      padding: 0 0 0.25rem;
      border-radius: 0;
      border-bottom: 2px solid var(--color-light);
      color: var(--color-light);
      // box-shadow: none;
    }
    &.center {
      @media(min-width: 40rem) {
        margin-left: auto;
      }
    }
  }
</style>
