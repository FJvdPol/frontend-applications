<template>
  <main>
    <div class="container">
      <h2>Login</h2>
      <form class="" @submit.prevent>
        <div :class="error.email ? 'input-group error' : 'input-group'">
          <label for="email">Email:</label>
          <input v-model="user.email" @focus="error.email = false" type="text" name="" id="email" value="">
          <p v-if="error.status == 404 && error.email">{{error.message}}</p>
        </div>
        <div :class="error.pass ? 'input-group error' : 'input-group'">
          <div class="pass-group">
            <label for="pass">Wachtwoord:</label>
            <input v-model="user.pass" @focus="error.pass = false" type="password" name="" id="pass" value="">
            <p v-if="error.status == 401 && error.pass">{{error.message}}</p>
          </div>
        </div>
        <p v-if="error.else" class="error">{{error.message}}</p>
        <input @click="login" class="button" type="submit" name="" value="log in">
      </form>
      <router-link :to="{name: 'register'}">
        <Button :class="'secondary'" :textContent="'nog geen account?'"/>
      </router-link>
    </div>
  </main>
</template>

<script>
import Authenticator from '../../services/authentication.js'
import Button from '../atoms/Button.vue'
export default {
  name: 'Login',
  data(){
    return {
      user: {
        email: '',
        pass: ''
      },
      error: {
        status: 0,
        message: '',
        email: false,
        pass: false,
        else: false
      },
      response: ''
    }
  },
  components: {
    Button
  },
  methods: {
    login() {
      if (this.user.email && this.user.pass){

        const response = Authenticator.login({
            email: this.user.email,
            pass: this.user.pass
          })

        this.response = response
        if (response.status === 200) {
          this.$store.dispatch('setUser', response.data.user)
          this.$router.push('/clienten')
        } else {
          this.error = {
            status: response.status,
            message: response.error,
          }
          if (this.error.status == 404){
            this.error.email = true
          } else if (this.error.status == 401){
            this.error.pass = true
          } else {
            this.error.else = true
          }
        }
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
