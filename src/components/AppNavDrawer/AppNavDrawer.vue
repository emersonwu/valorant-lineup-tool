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
import SpikeLocation from "@/interfaces/SpikeLocation";
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
    spikeFilter: {
      get(): string {
        return this.$store.getters.getSpikeFilter;
      },
      set(value: string): void {
        this.$store.commit(FilterMutations.SET_SPIKE_FILTER, value);
      },
    },
    spikesToDisplay: {
      get(): SpikeLocation[] {
        return this.$store.getters.getSpikesToDisplay;
      },
      set(value: SpikeLocation[]): void {
        this.$store.commit(FilterMutations.SET_SPIKES_TO_DISPLAY, value);
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
    },
    agentFilter: function () {
      this.locationsToDisplay = this.getLineupLocations();
    },
    mapFilter: function () {
      this.locationsToDisplay = this.getLineupLocations();
      this.spikesToDisplay = this.getSpikeLoctions();
    },
    spikeFilter: function () {
      this.locationsToDisplay = this.getLineupLocations();
    },
  },
  data() {
    return {
      mapDataManager: MapDataManager,
    };
  },
  mounted() {
    this.mapDataManager = new MapDataManager(MapType.BIND);
  },
  methods: {
    getSpikeLoctions(): SpikeLocation[] {
      let spikeLocations: SpikeLocation[] = new Array();
      for (const [spikeKey, lineupKeys] of this.mapDataManager.spikeLineups) {
        let coordinate: Coordinate =
          this.mapDataManager.coordinates.get(spikeKey);
        let spikeLocationInfo: LocationInfo =
          this.mapDataManager.locations.get(spikeKey);
        let name: string = spikeLocationInfo.name;
        let img: string = spikeLocationInfo.img;
        spikeLocations.push(
          new SpikeLocation(spikeKey, name, img, coordinate, lineupKeys)
        );
      }
      return spikeLocations;
    },
    getLineupLocations(): LineupLocation[] {
      let lineupLocationsMap: Map<string, LineupLocation> = new Map();
      var locationsFilteredByAbility: string[] = [];
      switch (this.abilityFilter) {
        case LineupType.VIPER_MOLLY:
          locationsFilteredByAbility = this.mapDataManager.getViperMollys();
          break;
        case LineupType.STANDARD_MOLLY:
          locationsFilteredByAbility = this.mapDataManager.getStandardMollys();
          break;
        default:
          // return empty list early as nothing selected
          return [];
      }
      for (const key of locationsFilteredByAbility) {
        if (this.spikeFilter != null) {
          let spikeLineups: string[] = this.mapDataManager.spikeLineups.get(
            this.spikeFilter
          );
          if (!spikeLineups.includes(key)) {
            continue;
          }
        }
        let location: LocationInfo = this.mapDataManager.locations.get(key);
        if (location) {
          let coordinate: Coordinate = this.mapDataManager.coordinates.get(
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