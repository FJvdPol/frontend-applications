<template>
  <button type="button" name="button">{{textContent}}</button>
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

<style lang="scss" scoped>
  button {
    display: block;
    background: 0;
    background-color: var(--color-dark);
    background: var(--gradient-bg);
    border: 0;
    border-radius: 25px;
    padding: 1rem 2.5rem;
    color: white;
    font-weight: 500;
    margin: 3rem auto;
    box-shadow: 0px 10px 40px 0px rgba(0, 0, 0, 0.15);
    &:focus, &:active {
      outline: none;
      background: var(--color-main);
    }
  }
</style>
