<template>
  <main>
    <div class="container">
      <h2>Login</h2>
      <form class="" @submit.prevent>
        <div class="input-group">
          <label for="email">Email:</label>
          <input v-model="user.email" @focus="error.email = false" :class="error.email ? 'error' : ''" type="text" name="" id="email" value="">
          <p v-if="response.status == 404 && error.email">{{response.data.error}}</p>
        </div>
        <div class="input-group">
          <div class="pass-group">
            <label for="pass">Wachtwoord:</label>
            <input v-model="user.pass" type="password" name="" id="pass" value="">
          </div>
        </div>
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
        email: false
      },
      response: ''
    }
  },
  components: {
    Button
  },
  methods: {
    async login() {
      if (this.user.email && this.user.pass){
        const response = await Authenticator.login({
          user: {
            email: this.user.email,
            pass: this.user.pass
          }

        })
        response.status == 404 ? this.error.email = true : this.error.email = false
        this.response = response
        response.status == 200 ? this.$router.push({name: 'home'}) : ''
      }
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
