<template>
  <nav id="tab-nav">
    <ul>
      <li v-for="(tab, index) in tabs" v-on:click="changeActiveTab(index)" :key="index" :class="index === 0 ? 'active-tab' : ''"><button>{{tab}}</button></li>
    </ul>
    <div v-if="tabs.length > 0" id="tab-bg"></div>
  </nav>

</template>

<script>
import { TweenLite } from 'gsap/all'
// import store from '../../store/store.js'

export default {
  name: 'AnalysisNavigation',
  props: ['tabs'],
  computed: {
    index() {
      this.changeActiveTab(this.$store.state.formindex)
      return this.$store.state.formindex
    }
  },
  mounted() {
    this.changeActiveTab(0)
  },
  watch: {
    tabs() {
      this.changeActiveTab(0)
    },
    index(index) {
      this.changeActiveTab(index)
    }
  },
  methods: {
    changeActiveTab(index) {
      let allTabs = document.querySelectorAll('#tab-nav li')
      if (index === allTabs.length || !allTabs[index]){
        return false
      }
      let activeTab = allTabs[index]
      this.animateTabNav(activeTab, allTabs, index)
    },
    animateTabNav(activeTab, allTabs, index) {
      // start animation phase
      // set timing for easing to scrolltop if page has been scrolled
      let timing = window.scrollY > 0 ? 0.5 : 0
      let allPages = document.querySelectorAll('.tab-page')
      if (allPages.length !== allTabs.length) {
        return false
      }

      // scroll to top of page
      TweenLite.to(window, timing, {scrollTo: {y:0}, autoKill:true, onComplete: () => {


        // toggle active class
        if (allTabs.length > 1) {
          allTabs.forEach((tabInstance, tabIndex) => {
            tabInstance.classList.remove('active-tab')
            allPages[tabIndex].classList.remove('active-page')
            if (tabInstance === activeTab) {
              allPages[tabIndex].classList.add('active-page')
            }
          })
        }
        activeTab.classList.add('active-tab')
        this.changeNavBg(activeTab, allTabs, index)

        // scroll container to get active tab in view
        let center = (window.innerWidth - activeTab.offsetWidth) / 2
        let container = document.querySelector('#tab-nav');
        TweenLite.to(container, 0.3, {scrollTo: {x:activeTab.offsetLeft, offsetX:center}})
      }})

    },
    changeNavBg(activeTab, allTabs, index) {

      let bg = document.querySelector('#tab-bg')
      let newElWidth, newElLeft
      // get offsets for animation
      if (index == (allTabs.length - 1)) {
        newElWidth = activeTab.offsetWidth / 16 - 0.5 + 'rem'
      } else {
        newElWidth = activeTab.offsetWidth / 16 + 2 + 'rem'
      }
      newElLeft = activeTab.offsetLeft - 40 + 'px'
      TweenLite.to(bg, 0.3, {width: newElWidth, x: newElLeft})
    }
  }
 }
</script>

<style lang="scss" scoped>
  #tab-nav {
    position: relative;
    background: var(--color-dark);
    overflow-x: auto;
    height: 4rem;
    &::-webkit-scrollbar {
      display: none;
    }
    ul {
      padding: 0;
      margin: 0;
      display: flex;
      height: 100%;
      li {
        align-self: stretch;
        margin: 0 1rem;
        display: flex;
        align-items: flex-end;
        button {
          color: var(--color-ultra-light);
          outline: none;
          -webkit-tap-highlight-color: transparent;
          height: 100%;
          height: 2.1rem;
          position: relative;
          z-index: 1;
          white-space: nowrap;
          transition: all 0.2s ease-in-out;
          font-size: 0.875rem;
          cursor: pointer;
          &:focus {
            color: var(--color-main);
          }
        }
        &.active-tab {
          button{
            color: var(--color-main);
          }
        }
        &:first-of-type {
          margin-left: 2.5rem;
        }
        &:last-of-type {
          padding-right: 2.5rem;
        }
      }
    }
    #tab-bg {
      content: "";
      display: block;
      background-color: white;
      width: 6rem;
      height: 2.5rem;
      position: absolute;
      bottom: 0;
      left: 1.5rem;
      border-radius: 25px 25px 0 0;
      @media(min-width: 60rem){
        background: var(--color-grey-ultra-light);
      }
    }
  }
</style>
