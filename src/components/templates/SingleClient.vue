<template>
  <main>
    <div class="header" v-bind:style="client.img ? 'background-image: url('+client.img+');' : ''">
      <h2>{{client.name}}</h2>
    </div>
    <TabNavigation :tabs="categories" />
    <article class="tab-page-holder">
      <section v-for="(category, index) in categories" :key="index" :class="index === 0 ? 'active-page tab-page' : 'tab-page'">
        <div class="container">
          <ul class="list">
            <li v-for="(value, key, index) in fakeClient" :key="index"><span>{{key}}: </span><span>{{value}}</span></li>
          </ul>
        </div>
      </section>
    </article>
  </main>
</template>

<script>
import TabNavigation from '../organisms/TabNavigation'
export default {
  name: 'SingleClient',
  components: {
    TabNavigation
  },
  data(){
    return {
      client: {},
      categories: ['Algemeen', 'Risico Indicatie'],
      fakeClient: {
        'age': 12,
        'city': 'Amsterdam',
        'zipcode': '1112PT'
      }
    }
  },
  mounted() {
    this.client = this.$route.query.client
  }
}
</script>

<style lang="scss">
  @import '../../assets/tabpages';
  main {
    padding-top: 3.125rem;
  }
  .header {
    min-height: 10rem;
    display: flex;
    align-items: flex-end;
    padding: 0 1.5rem 1rem;
    background-color: var(--color-light);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    h2 {
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
  .list {
    list-style-type: none;
    padding: 0;
    li {
      margin: 1rem 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

  }
</style>
