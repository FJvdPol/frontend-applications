<template>
  <main>
    <div class="container">
      <h2>Registreren</h2>
      <form class="" @submit.prevent>
        <div class="input-group">
          <label for="name">Gebruikersnaam:</label>
          <input v-model="name" type="text" name="" id="name" value="">
        </div>
        <div class="input-group">
          <div class="pass-group">
            <label for="pass">Wachtwoord:</label>
            <input v-model="pass" type="password" name="" id="pass" value="">
          </div>
        </div>
        <input @click="registerUser" class="button" type="submit" value="registreren">
      </form>
    </div>
  </main>
</template>

<script>
import Button from '../atoms/Button.vue'
import Authenticator from '../../services/authentication.js'

export default {
  name: 'Register',
  components: {
    Button
  },
  data(){
    return {
      name: '',
      pass: ''
    }
  },
  methods: {
    async registerUser() {
      const response = await Authenticator.register({
        name: this.name,
        pass: this.pass
      })
      console.log(response.data);
    }
  }
}
</script>

<style lang="scss" scoped>
  .input-group {
    padding-top: 0;
    padding-bottom: 2rem;
  }
  input[type="submit"] {
    margin-top: 0;
    margin-bottom: 1.5rem;
    width: auto;
  }
  .button {
    margin-top: 0;
  }
</style>
