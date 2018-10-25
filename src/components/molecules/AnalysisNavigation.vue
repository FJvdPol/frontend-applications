

<template>
  <nav id="tab-nav">
    <ul>
      <li v-for="(category, index) in categories" v-on:click="changeActiveTab" :key="index" :class="index === 0 ? 'active-tab' : ''">{{category}}</li>
    </ul>
    <div id="tab-bg"></div>
  </nav>
</template>

<script>
import { TweenLite } from 'gsap/all';
export default {
  name: 'AnalysisNavigation',
  data() {
    return {
    }
  },
  props: ['categories'],
  computed: {

  },
  methods: {
    changeActiveTab(e) {
      let tab = e.target
      let allTabs = document.querySelectorAll('#tab-nav li')
      let allPages = document.querySelectorAll('.tab-page')
      let newElWidth

      // animate the white selector behind active tabs
      if (tab === allTabs[allTabs.length - 1]) {
        newElWidth = tab.offsetWidth / 16 + 0.5 + 'rem'
      } else {
        newElWidth = tab.offsetWidth / 16 + 2 + 'rem'
      }
      let newElLeft = tab.offsetLeft - 24 + 'px'
      let bg = document.querySelector('#tab-bg')
      TweenLite.to(bg, 0.3, {width: newElWidth, x: newElLeft})

      // toggle active class
      allTabs.forEach((tab, index) => {
        tab.classList.remove('active-tab')
        allPages[index].classList.remove('active-page')
        if (tab === e.target) {
          tab.classList.add('active-tab')
          allPages[index].classList.add('active-page')
        }
      })

      // scroll container to get active tab in view
      let center = (window.innerWidth - tab.offsetWidth) / 2
      let container = document.querySelector('#tab-nav');
      TweenLite.to(container, 0.3, {scrollTo: {x:tab.offsetLeft, offsetX:center}})
    }
  }
 }
</script>

<style lang="scss" scoped>
  #tab-nav {
    position: relative;
    background: var(--gradient-bg);
    color: var(--color-light);
    overflow-x: scroll;
    ul {
      padding: 1.25rem 0 0.75rem;
      margin: 0;
      display: flex;
      li {
        position: relative;
        z-index: 1;
        white-space: nowrap;
        margin: 0 1rem;
        transition: all 0.2s ease-in-out;
        &.active-tab {
          color: var(--color-main);
        }
        &:first-of-type {
          margin-left: 1.5rem;
        }
        &:last-of-type {
          padding-right: 1.5rem;
        }
      }
    }
    #tab-bg {
      content: "";
      display: block;
      background-color: var(--color-ultra-light);
      width: 6.5rem;
      height: 2.5rem;
      position: absolute;
      bottom: 0;
      left: 0.5rem;
      border-radius: 25px 25px 0 0;
    }
  }
</style>
