<template>
  <main>
    <div class="container">
      <h2>Login</h2>
      <form class="" action="index.html" method="post">
        <div class="input-group">
          <label for="name">Gebruikersnaam:</label>
          <input type="text" name="" id="name" value="">
        </div>
        <div class="input-group">
          <div class="pass-group">
            <label for="pass">Wachtwoord:</label>
            <input type="password" name="" id="pass" value="">
          </div>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Login',
  data(){
    return {}
  }
}
</script>

<style lang="scss" scoped>
  .input-group {
    padding-top: 0;
    padding-bottom: 2rem;
  }
</style>
