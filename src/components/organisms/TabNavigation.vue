<template>
  <nav id="tab-nav">
    <ul>
      <li v-for="(tab, index) in tabs" v-on:click="changeActiveTab(index)" :key="index" :class="index === 0 ? 'active-tab' : ''"><button>{{tab}}</button></li>
    </ul>
    <div id="tab-bg"></div>
  </nav>

</template>

<script>
import { TweenLite } from 'gsap/all'
import EventBus from '../../event-bus.js'

export default {
  name: 'AnalysisNavigation',
  props: ['tabs', 'listenTo'],
  mounted() {
    EventBus.$on(this.listenTo, index => {
      this.changeActiveTab(index)
    })
  },
  methods: {
    changeActiveTab(index) {
      let allTabs = document.querySelectorAll('#tab-nav li')
      let bg = document.querySelector('#tab-bg')
      let allPages = document.querySelectorAll('.tab-page')
      let newElWidth, newElLeft, timing
      if (index === allTabs.length){
        return false
      }
      let activeTab = allTabs[index]

      // get offsets for animation
      if (index === allTabs.length - 1) {
        newElWidth = activeTab.offsetWidth / 16 - 0.5 + 'rem'
      } else {
        newElWidth = activeTab.offsetWidth / 16 + 2 + 'rem'
      }
      newElLeft = activeTab.offsetLeft - 40 + 'px'


      // start animation phase
      // set timing for easing to scrolltop if page has been scrolled
      timing = window.scrollY > 0 ? 0.5 : 0
      // scroll to top of page
      TweenLite.to(window, timing, {scrollTo: {y:0}, autoKill:true, onComplete: () => {

        TweenLite.to(bg, 0.3, {width: newElWidth, x: newElLeft})

        // toggle active class
        allTabs.forEach((tabInstance, index) => {
          tabInstance.classList.remove('active-tab')
          allPages[index].classList.remove('active-page')
          if (tabInstance === activeTab) {
            allPages[index].classList.add('active-page')
          }
        })
        activeTab.classList.add('active-tab')

        // scroll container to get active tab in view
        let center = (window.innerWidth - activeTab.offsetWidth) / 2
        let container = document.querySelector('#tab-nav');
        TweenLite.to(container, 0.3, {scrollTo: {x:activeTab.offsetLeft, offsetX:center}})
      }})

    }
  }
 }
</script>

<style lang="scss" scoped>
  #tab-nav {
    position: relative;
    background: var(--gradient-bg);
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
        button {
          color: var(--color-ultra-light);
          outline: none;
          -webkit-tap-highlight-color: transparent;
          height: 100%;
          padding-top: 1.9rem;
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
    }
  }
</style>
