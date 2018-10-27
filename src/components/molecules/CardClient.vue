<template >
  <article class="client">
    <router-link :to="{ path: client.name, query: { client }}" append>
      <figure v-if="client.img">
        <img :src="client.img" alt="">
      </figure>
      <figure v-else class="no-img">
        <img src="/assets/images/undraw_children.svg" alt="">
        <figcaption>Geen foto</figcaption>
      </figure>
      <div class="nav">
        <h3>{{client.name}} {{client.lastname}}</h3>
        <i class="fa fa-caret-right"></i>
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
    box-shadow: 0px 10px 40px -5px var(--boxshadow-standard);
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
      display: flex;
      justify-content: space-between;
      align-items: center;
      i {
        font-size: 1.5rem;
        color: var(--color-main);
      }
    }
    figure {
      position: relative;
      margin: 0;
      height: 10rem;
      overflow: hidden;
      border-radius: 5px 5px 0 0;
      background-color: var(--color-light);
      &.no-img {
        position: relative;
        &::after {
          opacity: 0.9;
        }
        img {
          opacity: 0.5;
        }
        figcaption {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 100%;
          color: white;
          text-align: center;
          z-index: 1;
          color: var(--color-ultra-light);
        }
      }
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
        opacity: 0.5;
      }
    }
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      opacity: 0.9;
    }
  }
</style>
