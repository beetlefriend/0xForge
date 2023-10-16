<template>
  <v-app class="grey lighten-4">
    <winXP></winXP>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
// import Doraemon from "./components/Doraemon.vue";
// import JackJack from "./components/JackJack.vue";

//import Simple from "./components/Simple.vue";
import WinXP from "./components/WinXP.vue";

export default Vue.extend({
  name: "App",
  components: {
    WinXP,
  },
});
</script>

<style>
.theme--dark.v-application {
  font-family: myFirstFont !important;
  color: var(--text-color, #000) !important;
  /* background-image: url("./assets/bg.png") !important;  */
  /* background-color: #37383d !important; */
  /* background-size: cover !important; */
  /* background-position: center; */
}

.theme--dark.v-application .v-card__text {
  color: var(--text-color, #000) !important;
}

@font-face {
  font-family: myFirstFont;
  /* src: url("fonts/game_over.ttf"); */
  src: url("fonts/SourceCodePro-VariableFont_wght.ttf");
}
.myFont {
  font-family: myFirstFont;
}

.v-card {
  background-color: var(--component-bg-color) !important;
  border: 1px solid var(--border-color) !important;
  color: var(--text-color, #000) !important;
}

/* For v-card-text */
/* .v-card-text {
  color: var(--text-color) !important;
} */

button:hover {
  background-color: var(--button-hover-bg-color);
}

body,
body * {
  color: var(--text-color);
}

body {
  font-family: "Tahoma", sans-serif !important;
}

/* a {
  text-decoration: none !important;
  color: white !important;
} */

html {
  scroll-behavior: smooth !important;
}

/* .v-text-field input {
  font-size: 1em;
}
.v-btn {
  font-size: 1em;
  background-color: #004d40 !important;
}

.v-card {
  display: flex !important;
  flex-direction: column;
  background-color: #00695c !important;
}

.v-data-table {
  background-color: #00695c !important;
}

.v-card__text {
  flex-grow: 1;
  overflow: auto;
} */
</style>
