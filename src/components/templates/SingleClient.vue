<template>
  <main id="single-client">
    <div class="header" v-bind:style="client.img ? 'background-image: url('+client.img+');' : ''">
      <h2>{{client.name}}</h2>
    </div>
    <TabNavigation :tabs="categories" />
    <article class="tab-page-holder">
      <section v-for="(category, index) in categories" :key="index" :class="index === 0 ? 'active-page tab-page' : 'tab-page'">
        <div class="container">
          <div class="algemeen" v-if="index == 0 && client.info">
            <ul class="list" >
              <li v-for="(value, key, i) in client.info" v-if="key != 'risk'" :key="i">
                <h3>{{key}}</h3>
                <p>{{value}}</p>
              </li>
            </ul>
          </div>
          <div class="risicoindicatie" v-if="index == 1 && client.info">
            <ul class="list" >
              <RiskIndication :percentage="client.info.risk"/>
              <Button :textContent="'indicatie bijstellen'"/>
            </ul>
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
      categories: ['Algemeen', 'Risico Indicatie'],
    }
  },
  mounted() {
    this.client = this.$route.query.client
  }
}
</script>

<style lang="scss">
  @import '../../assets/tabpages';
  #single-client {
    padding-top: 3.125rem;
    .header {
      min-height: 10rem;
      display: flex;
      align-items: flex-end;
      padding: 0 1.5rem 1rem;
      background-color: var(--color-light);
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      position: relative;
      &::after {
        content: "";
        width: 100%;
        top: 0;
        bottom: 0;
        left: 0;
        position: absolute;
        display: block;
        background-color: var(--color-gradient-start);
        background: var(--gradient-opaque);
        z-index: 0;
      }
      h2 {
        position: relative;
        z-index: 1;
        margin-bottom: 0;
        color: white;
        text-shadow: 0px 3px 5px rgba(0,0,0,0.2);
      }
    }
    .container {
      padding-top: 2rem;
    }
    h2 {
      span {
        text-transform: capitalize;
      }
    }
    figure {
      width: 100%;
      overflow: hidden;
      margin: 0;
      padding: 0;
      img {
        object-fit: cover;
        width: 100%;
        height: 100%;

      }
    }

    .tab-page {
      .risk-indication-holder {
        justify-content: center;
      }
    }
    .list {
      list-style-type: none;
      padding: 0;

      li {
        margin: 1rem 0;
        width: 100%;
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
  }

</style>
