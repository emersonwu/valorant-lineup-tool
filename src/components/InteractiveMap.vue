<template>
  <l-map
    ref="mapRef"
    :zoom="2"
    :center="[-128, 128]"
    :crs="crs"
    :minZoom="0"
    :maxZoom="5"
  >
    <l-tile-layer :url="url" :noWrap="true" />
    <div v-if="getLocationsToDisplay.length > 0">
      <lineup-marker
        v-for="location in getLocationsToDisplay"
        :key="location.location.key"
        :lineupLocation="location"
      />
    </div>
    <!-- TODO: Remove LatLongMarker Below -->
    <lat-long-marker />
  </l-map>
</template>

<script lang="ts">
import { CRS } from "leaflet";
import { LMap, LTileLayer } from "vue2-leaflet";
import { FilterMutations } from "@/store/filter/mutations";

import "leaflet/dist/leaflet.css";

import LineupMarker from "./LineupMarker.vue";
import LineupLocation from "@/interfaces/LineupLocation";
import LatLongMarker from "./DeveloperTools/LatLongMarker.vue";

export default {
  name: "InteractiveMap",
  components: {
    LMap,
    LTileLayer,
    LineupMarker,
    LatLongMarker,
  },
  data() {
    return {
      crs: CRS.Simple,
      url: "map_tiles/bind/{z}/{y}/{x}.png",
    };
  },
  computed: {
    getLocationsToDisplay(): LineupLocation[] {
      console.log("locationsToDisplay()", this.locationsToDisplay);
      return this.locationsToDisplay;
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
};
</script>

<style lang="scss" scoped>
.vue2leaflet-map {
  z-index: 1;
  width: 100%;
  background: white;
}
</style>