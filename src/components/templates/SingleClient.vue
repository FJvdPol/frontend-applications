<template>
  <main id="single-client">
    <div class="header" :class="!client.img ? 'no-img' : ''" :style="client.img ? 'background-image: url('+client.img+');' : ''">
      <h2>{{client.name}} {{client.lastname}}</h2>
    </div>
    <tab-navigation :tabs="categories" />
    <article class="tab-page-holder">
      <section v-for="(category, index) in categories" :key="index" :class="index === 0 ? 'active-page tab-page' : 'tab-page'">
        <div class="container">
          <div class="risicoindicatie" v-if="index == 0">
            <div class="list" v-if="!isNaN(client.risk)" >
              <risk-indication :percentage="client.risk"/>
              <Button class="center" :textContent="'indicatie bijstellen'" @click.native="clientRiskIndication"/>
            </div>

            <div v-if="isNaN(client.risk)" class="normal-content">
              <h3 class="center">Er is geen risicoindicatie bekend over deze persoon.</h3>
              <img src="/assets/images/undraw_blank_canvas.svg" alt="">
            </div>
          </div>

          <div class="algemeen normal-content" v-if="index == 1">
            <ul class="list" v-if="client.info" >
              <li v-for="(value, key, i) in client.info" v-if="key != 'risk'" :key="i">
                <h3>{{key}}</h3>
                <p>{{value}}</p>
              </li>
            </ul>

            <div v-if="!client.info">
              <h3>Er is geen algemene data bekend over deze persoon.</h3>
              <img src="/assets/images/undraw_blank_canvas.svg" alt="">
            </div>
          </div>

        </div>
      </section>
    </article>
  </main>
</template>

<script>
import TabNavigation from '../organisms/TabNavigation'
import RiskIndication from '../atoms/RiskIndication'
import Button from '../atoms/Button.vue'
import ClientService from '../../services/client.js'

export default {
  name: 'SingleClient',
  components: {
    TabNavigation,
    RiskIndication,
    Button
  },
  data(){
    return {
      client: {},
      categories: ['Risico Indicatie', 'Algemeen'],
      error: {}
    }
  },
  async mounted() {
    const response = ClientService.get(this.$route.params.id)
    if (response.status === 200){
      this.client = response.data.client
    } else {
      this.error = {
        status: response.status,
        message: response.error,
      }
      console.log(this.error)
    }
  },
  methods: {
    clientRiskIndication() {
      this.$store.dispatch('setClient', this.client)
      sessionStorage.setItem('client', JSON.stringify(this.client))
      this.$router.push({name: 'riskanalysis'})
    }
  }
}
</script>

<style lang="scss">
  @import '../../assets/tabpages';
  #single-client {
    padding-top: 3.125rem;
    min-height: 100vh;
    background-color: white;
    overflow: hidden;
    @media(min-width: 60rem) {
      padding-top: 0;
      background-color: transparent;
      overflow: auto;
    }
    #tab-nav {
      background: transparent;
      margin-top: -4rem;
      li {

        button {
          color: var(--color-ultra-light)
        }
        &.active-tab {
          button {
            color: var(--color-main)
          }
        }
        @media(min-width: 40rem){
          &:first-of-type {
            margin-left: 6rem;
          }
        }
      }
      #tab-bg {
        width: 7.5rem;
      }
    }
    .header {
      min-height: 13rem;
      display: flex;
      align-items: flex-end;
      padding: 0 1.5rem;
      background-color: var(--color-light);
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      position: relative;
      @media(min-width: 40rem){
        padding: 0 6rem;
      }
      &.no-img {
        min-height: 9rem;
      }
      &::after {
        content: "";
        width: 100%;
        top: 0;
        bottom: 0;
        left: 0;
        position: absolute;
        display: block;
        background-color: var(--color-ultra-light);
        background: var(--gradient-opaque);
        z-index: 0;
      }
      h2 {
        position: relative;
        z-index: 1;
        margin-bottom: 4rem;
        color: white;
        text-shadow: 0px 3px 5px rgba(0,0,0,0.2);
      }
    }
    .container {
      padding-top: 2rem;
    }
    h2 {
      text-transform: capitalize;
    }

    .tab-page {
      .risk-indication-holder {
        padding-top: 2rem;
        justify-content: center;
        @media(min-width: 40rem){
          justify-content: flex-start;
        }
      }
      img {
        display: block;
        width: 70%;
        max-width: 20rem;
        margin: 3rem auto 0;
      }
    }
    .list {
      list-style-type: none;
      padding: 0;

      li {
        margin: 1rem 0;
        width: 100%;
      }
    }
    .normal-content {
      h3 {
        color: var(--color-grey);
        font-weight: normal;
        font-size: 1rem;
        margin-bottom: 0.25rem;
      }
      p {
        font-size: 1.25rem;
        font-weight: 500;
        margin-top: 0;
        color: var(--color-main);
      }
    }
  }

</style>
