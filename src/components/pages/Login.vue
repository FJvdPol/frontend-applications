<template>
  <main>
    <div class="container">
      <h2>Login</h2>
      <form class="" @submit.prevent>
        <div :class="error.email ? 'input-group error' : 'input-group'">
          <label for="email">Email:</label>
          <p v-if="error.status == 404 && error.email">{{error.message}}</p>
          <input v-model="user.email" @focus="error.email = false" type="text" name="" id="email" value="">
        </div>
        <div :class="error.pass ? 'input-group error' : 'input-group'">
          <div class="pass-group">
            <label for="pass">Wachtwoord:</label>
            <p v-if="error.status == 401 && error.pass">{{error.message}}</p>
            <input v-model="user.pass" @focus="error.pass = false" type="password" name="" id="pass" value="">

          </div>
        </div>
        <p>{{error.message}}</p>
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
          sessionStorage.setItem('user', JSON.stringify(response.data.user))
          this.$router.push('/clienten')
        } catch (e) {
          if (e.response){
            this.error = {
              status: e.response.status,
              message: e.response.data.error,
            }
            this.error.status == 404 ? this.error.email = true : false
            this.error.status == 401 ? this.error.pass = true : false
            console.log(this.error)
          } else {
            this.error = {
              else: true,
              message: 'Er kon geen verbinding met internet gemaakt worden'
            }
          }

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
