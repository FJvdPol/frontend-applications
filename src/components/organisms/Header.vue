<template>
  <header v-bind:class="{'menu-visible': menuVisible}">
    <div class="content-holder">
      <button id="back-button" :class="$route.path === '/' ? 'hidden' : ''" v-on:click="$router.go(-1)">vorige</button>
      <h1><router-link :to="{name: 'home'}">Kind veilig thuis</router-link></h1>
      <button id="menu-button" v-on:click="toggleMenu">{{menuVisible ? 'Sluit' : 'Menu'}}</button>
      <nav>
        <ul class="top" @click="toggleMenu">
          <router-link tag="li" to="/">
            <a>Home</a>
          </router-link>
          <router-link tag="li" to="/clienten">
            <a>Cliënten</a>
          </router-link>
        </ul>
        <ul class="bottom">
          <router-link :to="{ name: 'info' }">
            <li><i class="fa fa-info-circle"></i> </li>
          </router-link>
          <li @click="logOut" v-if="$store.state.user">Ingelogd als: <span>{{$store.state.user.name}}</span></li>
          <router-link v-else :to="{ name: 'login' }">
            <li>log in</li>
          </router-link>


        </ul>
      </nav>
    </div>

  </header>

</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      menuVisible: false
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
    logOut() {
      sessionStorage.clear()
      this.$store.dispatch('logOut')
      this.menuVisible = false;
      this.$router.push({name: 'home'})
    }
  },
  watch: {
  '$route' () {
      this.menuVisible = false;
    }
  }

}
</script>

<style lang="scss" scoped>
  .home-page header {
    #back-button {
      opacity: 0;
      pointer-events: none;
    }
  }
  header {
    width: 100%;
    position: fixed;
    padding: 0 1.5rem;
    color: white;
    font-size: 0.875rem;
    background-color: var(--color-dark);
    z-index: 2;
    box-shadow: 0px 3px 5px 0px var(--boxshadow-dark);
    transition: all 0.5s ease-in-out;
    .content-holder {
      display: flex;
      justify-content: center;
      align-items: center;
      max-width: 63rem;
      margin: 0 auto;
    }
    &.menu-visible {
      nav {
        transform: translateX(-70vw);
        box-shadow: -10px 20px 30px 0px var(--boxshadow-dark);
        @media(min-width: 40rem){

          transform: translateX(-10rem);
        }
        @media(min-width: 60rem){
          transform: translateX(0);
        }
      }
      #menu-button {
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
    @media(min-width: 60rem){
      width: 10rem;
      box-shadow: none;
      background-color: var(--color-ultra-light);
      #menu-button, #back-button {
        display: none;
        pointer-events: none;
      }
    }
  }
  a {
    outline: none;
  }
  button {
    width: 4rem;
    line-height: 1;
    cursor: pointer;
    position: relative;
    z-index: 2;
    background: 0;
    color: inherit;
    font-size: inherit;
    border: 0;
    text-transform: lowercase;
    position: relative;
    // padding-right: 25px;
    text-align: left;
    height: 3.125rem;
    padding: 0;
    &:focus, &:active {
      outline: none;
    }
    &::before, &::after {
      display: block;
      content: "";
      width: 20px;
      height: 2px;
      background-color: #fff;
      position: absolute;
      transition: all 0.3s ease-in-out;
    }
    &#back-button {
      width: 3.5rem;
      text-align: right;
      transition: opacity 0.3s ease-in-out;
      &.hidden {
        opacity: 0;
        pointer-events: none;
      }
      &::before, &::after {
        width: 10px;
      }
      &::before {
        top: calc(50% - 4px);
        transform: rotate(-45deg);
      }
      &::after {
        bottom: calc(50% - 4px);
        transform: rotate(45deg);
      }
    }
    &#menu-button {
      &::before, &::after {
        right: 0;
        top: calc(50% - 3px);
      }
      &::after {
        top: calc(50% + 3px);
      }
    }

  }
  h1 {
    height: 3.125rem;
    margin: 0;
    margin-left: auto;
    margin-right: auto;
    color: inherit;
    font-weight: normal;
    font-size: inherit;
    display: flex;
    align-items: stretch;
    line-height: 1;
    @media(min-width: 60rem){
      color: var(--color-main)
    }
    a {
      display: flex;
      align-items: center;
      color: inherit;
      font-weight: inherit;
      font-size: inherit;
      text-decoration: none;
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
    @media(min-width: 40rem){
      width: 10rem;
    }
    @media(min-width: 60rem) {
      left: 0;
      transform: translateX(0);
      right: auto;
      box-shadow: none;
      background: var(--color-ultra-light);
    }
    ul {
      display: flex;
      flex-direction: column;
      padding: 0 1rem;
      margin: 0;
      &.top {
        padding-top: 6rem;
      }
      &.bottom {
        padding-bottom: 2rem;
        li {
          margin-bottom: 1rem;
          color: white;
          &:last-of-type {
            line-height: 2;
            span {
              color: white;
              font-weight: 500;
              cursor: pointer;
            }
          }
          @media(min-width: 60rem){
            color: var(--color-main);
            &:last-of-type {
              margin-bottom: 0;
              span {
                color: var(--color-main);
              }
              &:hover {
                span {
                  color: var(--color-dark);
                }
              }
            }
          }
          i {
            cursor: pointer;
            font-size: 1.5rem;
          }
        }
      }
      li {
        line-height: 1.5;
        text-align: center;
        margin-bottom: 2rem;
        font-size: 1rem;
        font-weight: normal;
        transition: all 0.3s ease-in-out;
        &.router-link-exact-active {
          font-weight: bold;
        }
        a {
          color: inherit;
          font-weight: inherit;
          text-decoration: none;
        }
        @media(min-width: 60rem){
          color: var(--color-main);
          &.router-link-exact-active {
            color: var(--color-dark);
          }
          &:hover {
            color: var(--color-light);
          }
        }
      }
    }
  }
</style>
