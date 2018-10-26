<template >
  <article class="client">
    <router-link :to="{ path: client.name, query: { client }}" append>
      <figure v-if="client.img">
        <img :src="client.img" alt="">
      </figure>
      <figure v-else class="no-img">
        <figcaption><i class="fa fa-user"></i> <span>Geen foto</span> </figcaption>
      </figure>
      <div class="nav">
        <h3>{{client.name}}</h3>
      </div>
    </router-link>
  </article>
</template>

<script>
export default {
  name: 'CardClient',
  props: ['client']
}
</script>

<style lang="scss" scoped>
  .client {
    // width: calc(50% - 0.5rem);
    width: 100%;
    max-width: 20rem;
    margin-bottom: 2rem;
    border-radius: 5px;
    box-shadow: 0px 10px 40px 0px rgba(0,0,0,0.15);
    a {
      text-decoration: none;
    }
    h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 500;
      color: var(--color-main);
    }
    .nav {
      padding: 1rem;
    }
    figure {
      margin: 0;
      height: 10rem;
      overflow: hidden;
      border-radius: 5px 5px 0 0;
      background-color: var(--color-light);
      &.no-img {
        display: flex;
        justify-content: center;
        align-items: center;
        figcaption {
          color: white;
          text-align: center;
          i {
            font-size: 3rem;
            margin-bottom: 0.5rem;
          }
          span {
            display: block;
          }
        }
      }
    }
    img {

      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
</style>
