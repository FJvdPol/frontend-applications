<template>
  <article class="tab-page-holder">
    <section v-if="questions.length == 0" class="active-page tab-page">
      <div class="container">
        <p class="center">geen vragen gevonden</p>
        <figure>
          <img src="/assets/images/undraw_no_data.svg" alt="">
        </figure>
      </div>
    </section>
    <section v-for="(type, index) in questions" :key="index" :class="index === 0 ? 'active-page tab-page' : 'tab-page'">
      <div class="container-form container">
        <h2>{{types[index]}}</h2>
        <form @submit.prevent>
          <div v-for="(category, i) in type" :key="i">
            <h3>{{category[0].category}}</h3>
            <input-group @valueChange="emitChildValue" v-for="(question, index) in category" :inputObject="question" :key="index" />
          </div>

        </form>
        <Button v-if="index < types.length - 1" :data-index="index" @click.native="nextPage" :textContent="'volgende'"/>
        <Button :class="'secondary'" v-if="index < types.length - 1" @click.native="saveForm" :textContent="'wijzigingen opslaan'"/>

        <Button v-if="index === types.length - 1" :textContent="'opslaan'" @click.native="saveForm"/>
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
  props: ['questions', 'types'],
  methods: {
    emitChildValue(data){
      this.$emit('valueChange', data)
    },
    nextPage(e){
      this.$store.dispatch('formSetIndex', Number(e.target.dataset.index) + 1)
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
  h3 {
    text-transform: capitalize;
    margin: 0;
    font-size: 1rem;
    font-weight: 500;
    color: var(--color-main);
  }

</style>
