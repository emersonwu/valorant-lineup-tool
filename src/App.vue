
<template>
  <v-app>
    <app-header />
    <app-nav-drawer />
    <interactive-map :lineupLocations="getLineupLocations" />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import InteractiveMap from "./components/InteractiveMap.vue";
import MapType from "./enums/MapType";
import { FilterMutations } from "./store/filter/mutations";
import AppNavDrawer from "./components/AppNavDrawer/AppNavDrawer.vue";
import AppHeader from "./components/AppHeader.vue";
import { AppMutations } from "./store/app/mutations";
import MapDataManager from "./utils/MapDataManager";
import LineupLocation from "./interfaces/LineupLocation";
import LineupType from "./enums/LineupType";
import LocationInfo from "./interfaces/LocationInfo";
import Coordinate from "./interfaces/Coordinate";

export default Vue.extend({
  name: "App",

  components: {
    AppNavDrawer,
    AppHeader,
    InteractiveMap,
  },

  data: () => ({}),
  methods: {
    getMapLocations(maptype: MapType): void {
      switch (maptype) {
        case MapType.BIND:
          break;
        default:
          return;
      }
    },
  },
  computed: {
    getMapManager(): MapDataManager {
      return new MapDataManager(this.getMapLocations(this.mapFilter));
    },
    getLineupLocations(): LineupLocation[] {
      let lineupLoationsMap: Map<string, LineupLocation> = new Map();
      let mapMapManger: MapDataManager = this.getMapManager;
      switch (this.abilityFilter) {
        case LineupType.VIPER_MOLLY:
          // TODO: Split logic to helper method
          for (var key in mapMapManger.getViperMollys) {
            let location: LocationInfo = mapMapManger.locations.get(key);
            let coordinate: Coordinate = mapMapManger.coordinates.get(
              location.coordinateKey
            );
            if (lineupLoationsMap.has(location.coordinateKey)) {
              lineupLoationsMap.get(location.coordinateKey).addLineup(location);
            } else {
              lineupLoationsMap.set(
                location.coordinateKey,
                new LineupLocation(coordinate)
              );
            }
          }
          break;
        case LineupType.STANDARD_MOLLY:
          for (var key1 in mapMapManger.getViperMollys) {
            let location: LocationInfo = mapMapManger.locations.get(key1);
            let coordinate: Coordinate = mapMapManger.coordinates.get(
              location.coordinateKey
            );
            if (lineupLoationsMap.has(location.coordinateKey)) {
              lineupLoationsMap.get(location.coordinateKey).addLineup(location);
            } else {
              lineupLoationsMap.set(
                location.coordinateKey,
                new LineupLocation(coordinate)
              );
            }
          }
          break;
        default:
          return [];
      }
      console.log(Array.from(lineupLoationsMap.values()));
      return Array.from(lineupLoationsMap.values());
    },
    abilityFilter: {
      get(): LineupType {
        return this.$store.getters.getLineupTypeFilter;
      },
      set(value: LineupType): void {
        this.$store.commit(FilterMutations.SET_LINEUP_TYPE_FILTER, value);
      },
    },
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
    console.log("inside mounted");
    console.log("mounted", this.getLineupLocations);
  },
});
</script>

<style>
@font-face {
  font-family: "Valorant";
  src: local("Valorant"), url(./fonts/Valorant-Font.ttf) format("truetype");
}
</style>