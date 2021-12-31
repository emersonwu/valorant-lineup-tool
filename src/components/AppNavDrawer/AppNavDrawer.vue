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
    locationsToDisplay: {
      get(): LineupLocation[] {
        return this.$store.getters.getLocationsToDisplay;
      },
      set(value: LineupLocation[]): void {
        this.$store.commit(FilterMutations.SET_LOCATIONS_TO_DISPLAY, value);
      },
    },
  },
  watch: {
    // Changes the locations to display store on ability, agent or map changes.
    abilityFilter: function () {
      this.locationsToDisplay = this.getLineupLocations();
      console.log(
        "Ability changed locationsToDisplay => ",
        this.locationsToDisplay
      );
    },
    agentFilter: function () {
      this.locationsToDisplay = this.getLineupLocations();
      console.log(
        "Agent changed locationsToDisplay => ",
        this.locationsToDisplay
      );
    },
    mapFilter: function () {
      this.locationsToDisplay = this.getLineupLocations();
      console.log(
        "Map changed locationsToDisplay => ",
        this.locationsToDisplay
      );
    },
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
      var locationsFilteredByAbility: string[] = [];
      switch (this.abilityFilter) {
        case LineupType.VIPER_MOLLY:
          locationsFilteredByAbility = mapMapManger.getViperMollys();
          break;
        case LineupType.STANDARD_MOLLY:
          locationsFilteredByAbility = mapMapManger.getStandardMollys();
          break;
        default:
          // return empty list early as nothing selected
          return [];
      }
      for (const key of locationsFilteredByAbility) {
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