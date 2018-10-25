<template>
  <div class="input-group">

    <div class="radio-group" v-if="inputObject.type == 'radio'">
      <!-- {{inputObject}} -->
      <p>{{inputObject.question}}</p>

      <label v-for="(option, index) in inputObject.choices" :key="index">
        <input @change="updateValue" type="radio" :name="inputObject.id" :value="option.weight">
        {{option.choice}}
      </label>

    </div>

    <div class="select-group" v-if="!inputObject.type">
      <label :for="inputObject.id">{{inputObject.question}}</label>
      <select @change="updateValue" :name="inputObject.id">
        <option value="" disabled selected></option>
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
    updateValue(e) {
      this.$emit('valueChange', {id: Number(e.target.name), value: Number(e.target.value)})
    }
  }
}
</script>

<style lang="scss" scoped>
  .input-group {
    margin-bottom: 2rem;
    label, p {
      margin-top: 0;
      color: var(--color-grey);
    }

    .select-group {
      label, select {
        display: block;
      }
      label {
        margin-bottom: 0.5rem;
      }
      select {
        -webkit-appearance: none;
        width: 100%;
        border: 0;
        padding: 1rem;
        line-height: 1.5;
        background-color: var(--color-light);
        border-radius: 5px;
        color: var(--color-dark);
      }

    }

    .radio-group {
      label {
        width: 50%;
        display: inline-flex;
        align-items: center;
        input {
          margin-right: 0.5rem;
          -webkit-appearance: none;
          width: 2rem;
          height: 2rem;
          background-color: var(--color-light);
          border-radius: 5px;
          position: relative;
          &::before {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            content: "";
            width: 2rem;
            height: 2rem;
            background-color: var(--color-main);
            opacity: 0;
            transition: all 0.3s ease-in-out;
            border-radius: 5px;
            justify-content: center;
            align-items: center;
            font-family: FontAwesome;
            color: white;
          }
          &:checked {
            &::before {
              opacity: 1;
              content:"\f00c";
            }
          }
        }

      }
    }
  }
</style>
