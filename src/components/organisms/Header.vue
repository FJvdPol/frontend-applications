<template>
  <header v-bind:class="{'menu-visible': menuVisible}">
    <h1><router-link :to="{ name: 'Home', params: {} }">Kind veilig thuis</router-link></h1>
    <button v-on:click="toggleMenu">Menu</button>
    <nav>
      <ul class="top">
        <router-link tag="li" to="/">
          <a>Home</a>
        </router-link>
        <router-link tag="li" to="/clienten">
          <a>Cliënten</a>
        </router-link>
        <router-link tag="li" to="/risico-analyse">
          <a>Risico Analyse</a>
        </router-link>
      </ul>
      <ul class="bottom">
        <li> <i class="fa fa-info-circle"></i> </li>
        <li>Ingelogd als: NAAM</li>

      </ul>
    </nav>
  </header>

</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      menuVisible: false,
    }
  },
  methods: {
    toggleMenu(){
      if (this.menuVisible){
        this.menuVisible = false
      } else {
        this.menuVisible = true
      }
    },

  },
  watch: {
  '$route' () {
      this.menuVisible = false;
    }
  }

}
</script>

<style lang="scss" scoped>
  header {
    width: 100%;
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.5rem;
    color: white;
    font-size: 14px;
    background-color: var(--color-dark);
    z-index: 2;
    box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.05);
    &.menu-visible {
      nav {
        transform: translateX(-70vw);
        box-shadow: -10px 20px 30px 0px rgba(0,0,0,0.15);
      }
      button {
        &::after {
          transform: rotate(45deg);
          top: 50%;
        }
        &::before {
          transform: rotate(-45deg);
          top: 50%;
        }
      }
    }
  }
  button {
    cursor: pointer;
    position: relative;
    z-index: 2;
    background: 0;
    color: inherit;
    font-size: inherit;
    border: 0;
    text-transform: lowercase;
    position: relative;
    padding-right: 40px;
    height: 3.125rem;
    &:focus, &:active {
      outline: none;
    }
    &::before, &::after {
      display: block;
      content: "";
      width: 30px;
      height: 2px;
      background-color: #fff;
      position: absolute;
      right: 0;
      top: calc(50% - 3px);
      transition: all 0.3s ease-in-out;
    }
    &::after {
      top: calc(50% + 3px);
    }
  }

  nav {
    position: absolute;
    top: 3.125rem;
    left: 100vw;
    width: 70vw;
    height: calc(100vh - 3.125rem);
    background-color: var(--color-main);
    background: var(--gradient-bg-dark);
    transition: all 0.5s ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    ul {
      display: flex;
      flex-direction: column;
      padding: 0;
      margin: 0;
      &.top {
        padding-top: 6rem;
      }
      &.bottom {
        padding-bottom: 2rem;
        li {
          margin-bottom: 1rem;
          i {
            font-size: 1.5rem;
          }
        }
      }

      li {
        text-align: center;
        margin-bottom: 2rem;
        font-size: 16px;
        font-weight: normal;
        &.router-link-exact-active {
          font-weight: bold;
        }
        a {
          color: inherit;
          font-weight: inherit;
          text-decoration: none;
        }
      }
    }
  }
  @media screen and (min-width: 40rem){
    header {
      nav {
        width: 20rem;
      }
      &.menu-visible {
        nav {
          transform: translateX(-20rem);
        }

      }
    }


  }

  h1 {
    color: inherit;
    font-weight: normal;
    font-size: inherit;
    a {
      color: inherit;
      font-weight: inherit;
      font-size: inherit;
      text-decoration: none;
    }
  }
</style>
