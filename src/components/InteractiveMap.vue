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
    <lineup-marker
      v-for="location in lineupMarkerineupLocations"
      :key="location.location.toString()"
      :lineupLocation="location"
    />
  </l-map>
</template>

<script lang="ts">
import { CRS } from "leaflet";
import { LMap, LTileLayer } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";

import LineupMarker from "./LineupMarker.vue";
import LineupLocation from "@/interfaces/LineupLocation";

export default {
  name: "InteractiveMap",
  components: {
    LMap,
    LTileLayer,
    LineupMarker,
  },
  props: {
    lineupLocations: {
      type: Object as () => LineupLocation[],
      required: false,
    },
  },
  data() {
    return {
      crs: CRS.Simple,
      url: "map_tiles/bind/{z}/{y}/{x}.png",
    };
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