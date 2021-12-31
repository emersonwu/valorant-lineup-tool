
<template>
  <v-app>
    <app-header />
    <app-nav-drawer />
    <interactive-map />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import InteractiveMap from "./components/InteractiveMap.vue";
import AppNavDrawer from "./components/AppNavDrawer/AppNavDrawer.vue";
import AppHeader from "./components/AppHeader.vue";

export default Vue.extend({
  name: "App",

  components: {
    AppNavDrawer,
    AppHeader,
    InteractiveMap,
  },
});
</script>

<style>
@font-face {
  font-family: "Valorant";
  src: local("Valorant"), url(./fonts/Valorant-Font.ttf) format("truetype");
}
</style>