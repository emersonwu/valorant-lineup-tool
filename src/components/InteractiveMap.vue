<template>
  <l-map
    ref="mapRef"
    :zoom="2"
    :center="[-128, 128]"
    :crs="crs"
    :minZoom="0"
    :maxZoom="maxZoom"
  >
    <l-tile-layer :url="url" :noWrap="true"></l-tile-layer>
    <l-marker :lat-lng="markerLatLng" :icon="icon"></l-marker>
  </l-map>
</template>

<script>
import { CRS } from "leaflet";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";

import Icons from "../leaflet_objects/Icons";

export default {
  name: "InteractiveMap",
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      url: "map_tiles/split/{z}/{y}/{x}.png",
      crs: CRS.Simple,

      markerLatLng: [-128, 128],
      icon: Icons.spike,
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