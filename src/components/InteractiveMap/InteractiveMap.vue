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

    <!-- Display Spike Locations -->
    <div v-if="spikesToDisplay.length > 0">
      <spike-marker
        v-for="spike in spikesToDisplay"
        :key="spike.location.key"
        :spikeLocation="spike"
      />
    </div>
    <!-- Display Lineup Locations -->
    <div v-if="locationsToDisplay.length > 0">
      <lineup-marker
        v-for="location in locationsToDisplay"
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

import SpikeMarker from "./SpikeMarker.vue";
import LineupMarker from "./LineupMarker.vue";
import SpikeLocation from "@/interfaces/SpikeLocation";
import LineupLocation from "@/interfaces/LineupLocation";
import LatLongMarker from "@/components/DeveloperTools/LatLongMarker.vue";

export default {
  name: "InteractiveMap",
  components: {
    LMap,
    LTileLayer,
    LineupMarker,
    LatLongMarker,
    SpikeMarker,
  },
  data() {
    return {
      crs: CRS.Simple,
      url: "map_tiles/bind/{z}/{y}/{x}.png",
    };
  },
  computed: {
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
};
</script>

<style lang="scss" scoped>
.vue2leaflet-map {
  z-index: 1;
  width: 100%;
  background: white;
}
</style>