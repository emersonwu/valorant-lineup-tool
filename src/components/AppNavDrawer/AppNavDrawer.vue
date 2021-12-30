<template>
  <v-navigation-drawer
    v-model="isNavBarOpen"
    absolute
    temporary
    width="100%"
    style="max-width: 650px"
  >
    <!-- Header -->
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="nav-drawer-header1"
          >Options
        </v-list-item-title>
      </v-list-item-content>
      <v-spacer></v-spacer>
      <v-icon large @click.stop="isNavBarOpen = !isNavBarOpen"
        >mdi-close</v-icon
      >
    </v-list-item>
    <v-divider></v-divider>

    <!-- Map -->
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="nav-drawer-header2">Map</v-list-item-title>
        <map-filter />
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>

    <!-- Hero -->
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="nav-drawer-header2">Agent</v-list-item-title>
        <agent-filter />
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>

    <!-- Ability -->
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="nav-drawer-header2"
          >Ability</v-list-item-title
        >
        <ability-filter />
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>

    <!-- Ability -->
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="nav-drawer-header2"
          >Temp Debug output</v-list-item-title
        >
        <v-list-item-title class="nav-drawer-header3">
          Map Selected: {{ getMapSelected }}</v-list-item-title
        >
        <v-list-item-title class="nav-drawer-header3">
          Agent Selected: {{ getAgentSelected }}</v-list-item-title
        >
        <v-list-item-title class="nav-drawer-header3">
          Ability Selected: {{ getAbilitySelected }}</v-list-item-title
        >
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { FilterMutations } from "@/store/filter/mutations";
import { AppMutations } from "@/store/app/mutations";
import MapFilter from "./MapFilter.vue";
import AgentFilter from "./AgentFilter.vue";
import AbilityFilter from "./AbilityFilter.vue";
import MapDataManager from "@/utils/MapDataManager";
import LineupLocation from "@/interfaces/LineupLocation";
import LocationInfo from "@/interfaces/LocationInfo";
import Coordinate from "@/interfaces/Coordinate";

import Vue from "vue";
import LineupType from "@/enums/LineupType";
import AgentType from "@/enums/AgentType";
import MapType from "@/enums/MapType";

export default Vue.extend({
  name: "AppNavDrawer",
  components: {
    MapFilter,
    AgentFilter,
    AbilityFilter,
  },
  computed: {
    isNavBarOpen: {
      get(): boolean {
        return this.$store.getters.isNavBarOpen;
      },
      set(value: boolean): void {
        this.$store.commit(AppMutations.SET_IS_NAV_BAR_OPEN, value);
      },
    },
    // Below for debug testing
    getMapSelected() {
      if (this.mapFilter) {
        return MapType[this.mapFilter];
      }
      return "Nothing selected";
    },
    getAgentSelected() {
      if (this.agentFilter) {
        return AgentType[this.agentFilter];
      }
      return "Nothing selected";
    },
    getAbilitySelected() {
      console.log("getAbilitySelected()", this.abilityFilter);
      if (this.abilityFilter) {
        return LineupType[this.abilityFilter];
      }
      return "Nothing selected";
    },
    // Above for debug testing
    abilityFilter: {
      get(): LineupType {
        return this.$store.getters.getLineupTypeFilter;
      },
      set(value: LineupType): void {
        this.$store.commit(FilterMutations.SET_LINEUP_TYPE_FILTER, value);
      },
    },
    agentFilter: {
      get(): boolean {
        return this.$store.getters.getAgentFilter;
      },
      set(value: AgentType): void {
        this.$store.commit(FilterMutations.SET_AGENT_FILTER, value);
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
  },
  watch: {
    // Changes the locations to display store on ability, agent or map changes.
    abilityFilter: function () {
      console.log(
        "AppNavDrawer getLineupLocations()",
        this.getLineupLocations()
      );
    },
    agentFilter: function () {
      console.log(
        "AppNavDrawer getLineupLocations()",
        this.getLineupLocations()
      );
    },
    mapFilter: function () {
      console.log(
        "AppNavDrawer getLineupLocations()",
        this.getLineupLocations()
      );
    },
  },
  mounted() {
    console.log("AppNavDrawer getLineupLocations()", this.getLineupLocations());
  },
  methods: {
    filterChanged() {},
    getMapManager(): MapDataManager {
      return new MapDataManager(MapType.BIND);
    },
    getLineupLocations(): LineupLocation[] {
      let lineupLocationsMap: Map<string, LineupLocation> = new Map();
      let mapMapManger: MapDataManager = this.getMapManager();
      console.log("mapMapManager", mapMapManger);
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
  },
});
</script>

<style>
.v-list-item__title {
  font-family: "Valorant";
}
.nav-drawer-header1 {
  font-size: 3em !important;
}
.nav-drawer-header2 {
  font-size: 2em !important;
}
.nav-drawer-header3 {
  font-size: 1em !important;
}
</style>