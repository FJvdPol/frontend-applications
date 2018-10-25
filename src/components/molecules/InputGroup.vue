<template>
  <div class="input-group">

    <div class="radio-group" v-if="inputObject.type == 'radio'">
      <!-- {{inputObject}} -->
      <p>{{inputObject.question}}</p>

      <label v-for="(option, index) in inputObject.choices" :key="index">
        <input @change="emitValue" type="radio" :name="inputObject.id" :value="option.weight">
        {{option.choice}}
      </label>

    </div>

    <div class="select-group" v-if="!inputObject.type">
      <label :for="inputObject.id">{{inputObject.question}}</label>
      <select @change="emitValue" :name="inputObject.id">
        <option value="" selected disabled></option>
        <option v-for="(option, index) in inputObject.choices" :value="option.weight" :key="index">{{option.choice}}</option>
      </select>
    </div>

  </div>
</template>

<script>
export default {
  name: 'InputGroup',
  data() {
    return {}
  },
  props: ['inputObject'],
  methods: {
    emitValue(e) {
      this.$emit('valueChange', {id: Number(e.target.name), value: Number(e.target.value)})
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/forms';
  .input-group {
    margin-bottom: 2rem;
  }
</style>
