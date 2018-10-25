<template>
  <article class="tab-page-holder">
    <section v-for="(category, index) in questionsByCategory" :key="index" :class="index === 0 ? 'active-page tab-page' : 'tab-page'">
      <div class="container">
        <h2>{{categories[index]}}</h2>
        <form @submit.prevent>
          <InputGroup @valueChange="emitChildValue" v-for="(questionObject, index) in splitQuestions(index)" :inputObject="questionObject" :key="index" />
        </form>
        <Button @click.native="nextPage(index)" :textContent="'volgende'"/>
      </div>
    </section>
  </article>

</template>

<script>
import InputGroup from '../molecules/InputGroup.vue'
import Button from '../atoms/Button.vue'
import EventBus from '../../event-bus.js'

export default {
  name: 'AnalysisBody',
  data() {
    return {
      values: []
    }
  },
  props: ['questionsByCategory', 'categories'],
  methods: {
    splitQuestions(index) {
      return this.questionsByCategory[index]
    },
    emitChildValue(data){
      this.$emit('valueChange', data)
    },
    nextPage(index){
      EventBus.$emit('riskindication-form-next', index)
    }
  },
  components: {
    InputGroup,
    Button
  }
 }
</script>

<style lang="scss" scoped>
  section {
    background-color: var(--color-ultra-light);
  }
  .input-group {
    background-color: white;
    padding: 2rem 1.5rem;
    margin-bottom: 0.25rem;
  }
  h2 {
    // color: white;
    padding: 0 1.5rem;
    font-size: 1.5rem;
    margin-bottom: 2.5rem;
  }
  .container {
    padding: 0;
    padding-top: 3rem;
    padding-bottom: 7rem;
  }
  .tab-page-holder {
    position: relative;
    min-height: 100vh;
  }
  .tab-page {
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100vw;
    opacity: 0;
    z-index: -1;
    transition: all 0.3s ease-in-out;
    height: 100vh;
    overflow: hidden;
    &.active-page {
      height: auto;
      overflow: auto;
      min-height: 100vh;
      z-index: 0;
      opacity: 1;
    }
  }
</style>
