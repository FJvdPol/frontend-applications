<template>
  <main id="info">
    <div class="container">
      <h2>Kind veilig thuis</h2>
      <h3>Risico analyse app</h3>
      <div class="paragraph-group">
        <p>
          Deze tool is ontstaan door het toepassen van predictive analytics en pattern mining op historische gegevens van Amsterdamse jongeren van het CBS.
        </p>
        <p>
          Door middel van het koppelen van informatie uit CBS microdata is een dataset onstaan van jongeren uit Amsterdam tussen 0 en 18 jaar. De peildatum hiervoor is 31-12-2015. Binnen deze dataset kan een vergelijking gemaakt worden tussen jongeren die wel een zwaardere vorm van jeugdhulp gehad hebben en jongeren die dit niet gehad hebben. Op basis van literatuur en het toepassen van data mining, zijn de meest onderscheidende factoren geidentificeerd die het risico op een hulptraject verhogen of verlagen. Aan de hand hiervan is een model ontwikkeld die het risico op een zwaardere vorm van jeugdhulp geeft voor een individu aan de hand van kernmerken
        </p>
        <p>
          Dit model is ontwikkeld op basis van een gedeelte van de totale set. Een gedeelte van de dataset is apart gehouden om de prestatie van het model te testen op ongeziene data. Het percentage jongeren dat het model juist indentificeert of er wel of geen zwaardere vorm van jeugdhulp vormt (accuraatheid) is (...)%. Het percentage jongeren met een zwaar hulptraject dat het model juist identificeert (sensitiviteit) is (...)%
        </p>
        <p>
          Dit model is academisch gevalideerd en is over gepubliceerd in (...) en te verkijgen op deze pagina: (...). Meer informatie over het model en de uitgevoerde analyses kunt u daarin vinden.
        </p>
      </div>
      <h3>Contact</h3>
      <div class="paragraph-group">
        <p>
          Voor meer informatie over het gebruik van de tool en de totstandkoming hiervan, kunt u contact opnemen met:
        </p>
        <p>
          Arjan de Jager, programma manager Garage2020 Amsterdam
        </p>
      </div>

    </div>
  </main>
</template>

<script>
import Button from '../atoms/Button.vue'
export default {
  name: 'home',
  components: {
    Button
  }
}
</script>

<style lang="scss" scoped>
  .paragraph-group {
    margin-bottom: 3rem;
  }
  main {
    background-color: white;
    min-height: 100vh;
  }
  .container {
    max-width: 40rem;
  }
  h3 {
    color: var(--color-light);
    font-weight: 500;
  }
  img {
    max-width: 30rem;
    display: block;
    width: 70%;
    margin: 4rem auto 0;
  }
  @media screen and (min-width: 60rem){
    img {
      width: 15rem;
      margin: 4rem 0;
    }
  }


</style>
