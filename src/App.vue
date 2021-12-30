
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
import Icons from "./leaflet_objects/Icons";

export default Vue.extend({
  name: "App",

  components: {
    AppNavDrawer,
    AppHeader,
    InteractiveMap,
  },

  data: () => ({
    // Test
    markerLatLng: [-128, 128],
    markerLatLng2: [0, 0],
    icon: Icons.spike,
    testLocation: {} as LineupLocation,
    testLocationInfo: {
      key: "lineup1",
      name: "Lineup name 1",
      description: "Description for lineup 1",
      coordinateKey: "lineup1&2",
      img: "images/bind/postPlantLineups/1.png",
    } as LocationInfo,
    testLocation2: {} as LineupLocation,
    testLocationInfo2: {
      key: "lineup1",
      name: "Lineup name 1",
      description: "Description for lineup 1",
      coordinateKey: "lineup1&2",
      img: "images/bind/postPlantLineups/1.png",
    } as LocationInfo,
    locations: {} as LineupLocation[],
  }),
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
      let lineupLocationsMap: Map<string, LineupLocation> = new Map();
      let mapMapManger: MapDataManager = this.getMapManager;
      // switch (this.abilityFilter) {
      // case LineupType.VIPER_MOLLY:
      // TODO: Split logic to helper method
      for (const key of mapMapManger.getViperMollys()) {
        let location: LocationInfo = mapMapManger.locations.get(key);
        let coordinate: Coordinate = mapMapManger.coordinates.get(
          location.coordinateKey
        );
        if (lineupLocationsMap.has(location.coordinateKey)) {
          lineupLocationsMap.get(location.coordinateKey).addLineup(location);
        } else {
          var lineupLocation = new LineupLocation(coordinate);
          lineupLocation.addLineup(location);
          lineupLocationsMap.set(location.coordinateKey, lineupLocation);
        }
      }
      //   break;
      // case LineupType.STANDARD_MOLLY:
      //   for (var key1 in mapMapManger.getViperMollys) {
      //     let location: LocationInfo = mapMapManger.locations.get(key1);
      //     let coordinate: Coordinate = mapMapManger.coordinates.get(
      //       location.coordinateKey
      //     );
      //     if (lineupLocationsMap.has(location.coordinateKey)) {
      //       lineupLocationsMap.get(location.coordinateKey).addLineup(location);
      //     } else {
      //       lineupLocationsMap.set(
      //         location.coordinateKey,
      //         new LineupLocation(coordinate)
      //       );
      //     }
      //   }
      //   break;
      // default:
      //   console.log("lineupLocationsMap.values() is null");
      //   return [];
      // }
      return Array.from(lineupLocationsMap.values());
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
    locationsToDisplay: {
      get(): LineupLocation[] {
        return this.$store.getters.getLocationsToDisplay;
      },
      set(value: LineupLocation[]): void {
        this.$store.commit(FilterMutations.SET_LOCATIONS_TO_DISPLAY, value);
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
    this.testLocation = new LineupLocation(this.markerLatLng);
    this.testLocation.addLineup(this.testLocationInfo);
    this.testLocation2 = new LineupLocation(this.markerLatLng2);
    this.testLocation2.addLineup(this.testLocationInfo);
    this.locations = [];
    this.locations.push(this.testLocation);
    this.locations.push(this.testLocation2);
  },
});
</script>

<style>
@font-face {
  font-family: "Valorant";
  src: local("Valorant"), url(./fonts/Valorant-Font.ttf) format("truetype");
}
</style>