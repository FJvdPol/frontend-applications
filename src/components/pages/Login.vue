<template>
  <main>
    <div class="container">
      <h2>Login</h2>
      <form class="" @submit.prevent>
        <div :class="error.email ? 'input-group error' : 'input-group'">
          <label for="email">Email:</label>
          <input v-model="user.email" @focus="error.email = false" type="text" name="" id="email" value="">
          <p v-if="response.status == 404 && error.email">{{response.data.error}}</p>
        </div>
        <div :class="error.pass ? 'input-group error' : 'input-group'">
          <div class="pass-group">
            <label for="pass">Wachtwoord:</label>
            <input v-model="user.pass" @focus="error.pass = false" type="password" name="" id="pass" value="">
            <p v-if="response.status == 401 && error.pass">{{response.data.error}}</p>
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
        email: false,
        pass: false
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
        try {
          const response = await Authenticator.login({
            user: {
              email: this.user.email,
              pass: this.user.pass
            }

          })
          this.response = response
          this.$store.dispatch('setUser', response.data.user)
          sessionStorage.setItem('user', JSON.stringify(response.data.user));
          this.$router.push({name: 'home'})
        } catch (e) {
          console.log(e);
          e.response.status == 404 ? this.error.email = true : false
          e.response.status == 401 ? this.error.pass = true : false
          this.response = e.response
        }

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
