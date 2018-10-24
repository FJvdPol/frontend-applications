<template>
  <header v-bind:class="{'menu-visible': menuVisible}">
    <h1>Kind veilig thuis</h1>
    <button v-on:click="toggleMenu">Menu</button>
    <nav>
      <ul>
        <router-link tag="li" to="/">
          <a>Start Risicoindicatie</a>
        </router-link>
        <router-link tag="li" to="/clienten">
          <a>Cliënten</a>
        </router-link>
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
    padding: 0.5rem 1.5rem;
    color: white;
    font-size: 14px;
    background-color: var(--color-dark);
    z-index: 2;
    box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.05);
    &.menu-visible {
      nav {
        transform: translateX(-70vw);
        box-shadow: -3px 0px 15px 0px rgba(0,0,0,0.1);
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
    position: relative;
    z-index: 2;
    background: 0;
    color: inherit;
    font-size: inherit;
    border: 0;
    text-transform: lowercase;
    position: relative;
    padding-right: 40px;
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
    top: 3.2rem;
    left: 100vw;
    width: 70vw;
    height: calc(100vh - 3.2rem);
    background-color: var(--color-main);
    transition: all 0.5s ease-in-out;

    ul {
      display: flex;
      flex-direction: column;
      padding: 0;
      margin: 0;
      padding-top: 6rem;
      height: 50vh;

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
  h1 {
    color: inherit;
    font-weight: normal;
    font-size: inherit;
  }
</style>
