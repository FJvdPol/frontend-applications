<template>
  <article class="tab-page-holder">
    <section v-if="questionsByCategory == 0" class="active-page tab-page">
      <div class="container">
        <p class="center">geen vragen gevonden</p>
        <figure>
          <img src="/assets/images/undraw_no_data.svg" alt="">
        </figure>
      </div>
    </section>
    <section v-for="(category, index) in questionsByCategory" :key="index" :class="index === 0 ? 'active-page tab-page' : 'tab-page'">
      <div class="container-form container">
        <h2>{{categories[index]}}</h2>
        <form @submit.prevent>
          <input-group @valueChange="emitChildValue" v-for="(questionObject, index) in splitQuestions(index)" :inputObject="questionObject" :key="index" />
        </form>
        <Button v-if="index < questionsByCategory.length - 1" @click.native="nextPage(index)" :textContent="'volgende'"/>
        <Button :class="'secondary'" v-if="index < questionsByCategory.length - 1" @click.native="saveForm" :textContent="'wijzigingen opslaan'"/>

        <Button v-if="index === questionsByCategory.length - 1" :textContent="'opslaan'" @click.native="saveForm"/>
      </div>
    </section>
  </article>

</template>

<script>
import InputGroup from '../molecules/InputGroup.vue'
import Button from '../atoms/Button.vue'

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
      this.$store.dispatch('formSetIndex', index + 1)
    },
    saveForm() {
      this.$emit('saveForm')
    }
  },
  components: {
    InputGroup,
    Button
  }
 }
</script>

<style lang="scss" scoped>
  @import '../../assets/tabpages';
  h2 {
    font-size: 1.5rem;
    margin-bottom: 2.5rem;
  }
  .tab-page-holder {
    min-height: 50vh;
    .tab-page {
      height: 0;
      &.active-page {
        height: auto;
        min-height: 50vh;
      }
    }
  }
  .input-group {

    margin-bottom: 1rem;
  }
  .container {
    padding-top: 2rem;
    &.container-form {
      margin: 0;
      @media(min-width: 40rem){
        margin: 0 3rem;
      }
      padding-top: 3rem;
      padding-bottom: 7rem;
    }
  }
  figure {
    width: 50%;
    margin: 0 auto;
  }

</style>
