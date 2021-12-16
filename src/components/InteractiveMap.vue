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
    <lineup-marker :lineupLocation="testLocation" />
  </l-map>
</template>

<script lang="ts">
import { CRS } from "leaflet";
import { LMap, LTileLayer } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";

import Icons from "../leaflet_objects/Icons";
import LineupMarker from "./LineupMarker.vue";
import LineupLocation from "@/interfaces/LineupLocation";
import LocationInfo from "@/interfaces/LocationInfo";

export default {
  name: "InteractiveMap",
  components: {
    LMap,
    LTileLayer,
    LineupMarker,
  },
  props: {
    LineupMarkerineupLocations: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      url: "map_tiles/split/{z}/{y}/{x}.png",
      crs: CRS.Simple,

      markerLatLng: [-128, 128],
      icon: Icons.spike,
      testLocation: {} as LineupLocation,
      testLocationInfo: {
        key: "lineup1",
        name: "Lineup name 1",
        description: "Description for lineup 1",
        coordinateKey: "lineup1&2",
        img: "images/bind/postPlantLineups/1.png",
      } as LocationInfo,
    };
  },
  created() {
    this.testLocation = new LineupLocation(this.markerLatLng);
    this.testLocation.addLineup(this.testLocationInfo);
    console.log(this.testLocation);
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