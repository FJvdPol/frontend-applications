<template >
  <article class="client">
    <figure class="no-img">
      <figcaption>Loading client...</figcaption>
    </figure>
    <div class="nav">
      <h3></h3>
      <i></i>
    </div>
  </article>
</template>

<script>
export default {
  name: 'LoaderCart'
}
</script>

<style lang="scss" scoped>
  .client {
    width: 100%;
    max-width: 20rem;
    margin-bottom: 2rem;
    border-radius: 5px;
    box-shadow: 0px 10px 40px -5px var(--boxshadow-standard);
    background: white;
    h3 {
      margin: 0;
      font-size: 1rem;
      height: 1rem;
      font-weight: 500;
      content: "";
    }
    i {
      font-size: 1.5rem;
      color: var(--color-main);
    }
    .nav {
      padding: 1rem;
      display: flex;
    }
    figure {
      position: relative;
      margin: 0;
      height: 10rem;
      overflow: hidden;
      border-radius: 5px 5px 0 0;
      background-color: var(--color-light);
      &.no-img {
        &::after {
          opacity: 0.9;
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
        width: 5rem;
        top: 0;
        bottom: 0;
        left: 0;
        position: absolute;
        display: block;
        background-color: var(--boxshadow-standard);
        // background: var(--gradient-opaque);
        z-index: 0;
        opacity: 0.1;
        animation: load 1s infinite linear;
      }
    }
  }
</style>
