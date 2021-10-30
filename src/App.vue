
<template>
  <v-app>
    <app-header />
    <app-nav-drawer />
    <Map />
    <location-info-popup :isOpen="true" :locationMarker="location" />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Map from "./components/Map.vue";
import LocationInfoPopup from "./components/LocationInfoPopup.vue";
import LocationMarker from "./interfaces/LocationMarker";
import bindMapData from "./data/bind.json";
import MapType from "./enums/MapType";
import { FilterMutations } from "./store/filter/mutations";
import AppNavDrawer from "./components/AppNavDrawer/AppNavDrawer.vue";
import AppHeader from "./components/AppHeader.vue";
import { AppMutations } from "./store/app/mutations";

export default Vue.extend({
  name: "App",

  components: {
    LocationInfoPopup,
    Map,
    AppNavDrawer,
    AppHeader,
  },

  data: () => ({
    location: new LocationMarker(
      bindMapData.postPlantLineup[0]
    ) as LocationMarker,
  }),

  computed: {
    mapFilter: {
      get(): MapType {
        return this.$store.getters.getMapFilter;
      },
      set(value: MapType): void {
        this.$store.commit(FilterMutations.SET_MAP_FILTER, value);
      },
    },
    isNavBarOpen: {
      get(): boolean {
        return this.$store.getters.isNavBarOpen;
      },
      set(value: boolean): void {
        this.$store.commit(AppMutations.SET_IS_NAV_BAR_OPEN, value);
      },
    },
  },
  mounted() {
    console.log(this.mapFilter);
    this.mapFilter = MapType.ICEBOX;
    console.log(this.mapFilter);
  },
});
</script>

<style>
@font-face {
  font-family: "Valorant";
  src: local("Valorant"), url(./fonts/Valorant-Font.ttf) format("truetype");
}
</style>