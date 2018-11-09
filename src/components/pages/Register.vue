<template>
  <main>
    <div class="container">
      <h2>Registreren</h2>
      <form class="" @submit.prevent>
        <div :class="error.name ? 'input-group error' : 'input-group'">
          <label for="name">Gebruikersnaam:</label>
          <input v-model="user.name" @focus="error.name = false" type="text" name="" id="name" value="">
        </div>
        <div :class="error.email ? 'input-group error' : 'input-group'">
          <label for="email">Email:</label>
          <input v-model="user.email" @focus="error.email = false" type="email" name="" id="email" value="">
          <p v-if="error.status == 400 && error.email">{{error.message}}</p>

        </div>
        <div :class="error.pass ? 'input-group error' : 'input-group'">
          <div class="pass-group">
            <label for="pass">Wachtwoord:</label>
            <input v-model="user.pass" @focus="error.pass = false" type="password" name="" id="pass" value="">
          </div>
        </div>
        <p v-if="error.name && user.name.length == 0 || error.email && user.email.length == 0 || error.pass && user.pass.length == 0" class="center">Gelieve alle velden in te vullen</p>
        <p v-if="error.else" class="error">{{error.message}}</p>
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
      user: {
        name: '',
        email: '',
        pass: ''
      },
      error: {
        name: false,
        email: false,
        pass: false,
        message: '',
        status: 0
      }
    }
  },
  methods: {
    async registerUser() {
      if (this.user.name && this.user.email && this.user.pass){
        try {
          const response = await Authenticator.register({
            user: {
              name: this.user.name,
              email: this.user.email,
              pass: this.user.pass
            }
          })
          this.response = response
          response.status == 200 ? this.$router.push({name: 'home'}) : ''
          this.$store.dispatch('setUser', response.data.user)
        } catch (e) {
          if (e.response){
            this.error = {
              status: e.response.status,
              message: e.response.data.error,
            }
            if (this.error.status == 400){
              this.error.email = true
            } else {
              this.error.else = true
            }
          } else {
            this.error = {
              else: true,
              email: false,
              message: 'Er kon geen verbinding met internet gemaakt worden'
            }
          }
        }

      } else {
        !this.user.name ? this.error.name = true : this.error.name = false
        !this.user.email ? this.error.email = true : this.error.email = false
        !this.user.pass ? this.error.pass = true : this.error.pass = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  main {
    background: white;
    min-height: 100vh;
  }
  .input-group {
    padding-top: 0;
    padding-bottom: 2rem;
  }
  input[type="submit"] {
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    width: auto;
  }
  .button {
    margin-top: 2rem;
  }
  .container {
    padding-bottom: 6rem;
  }
</style>
