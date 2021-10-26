<template>
  <l-map
    class="map"
    ref="mapRef"
    :zoom="zoom"
    :center="center"
    :crs="crs"
    :minZoom="minZoom"
    :maxZoom="maxZoom"
  >
    <l-tile-layer :url="url" :noWrap="true"></l-tile-layer>
    <l-marker :lat-lng="markerLatLng" :icon="icon"></l-marker>
  </l-map>
</template>

<script>
import { CRS } from "leaflet";
import L from "leaflet";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";

import Markers from "../leaflet_objects/Markers";
import MapDataManager from "../utils/MapDataManager";
import Icons from "../leaflet_objects/Icons";

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      zoom: 2,
      center: [-128, 128],
      mapSW: [-1000, 9192],
      mapNE: [9192, -1000],
      minZoom: 0,
      maxZoom: 5,
      url: "tiles/{z}/{y}/{x}.png",
      crs: CRS.Simple,
      markerLatLng: [-128, 128],
      icon: Icons.spike,
      imageBounds: {},
    };
  },
  methods: {
    setupLeafletMap: function () {
      this.mapDiv = new L.map("mapContainer").setView(this.center, 2);
      L.tileLayer("tiles/{z}/{y}/{x}.png", {
        minZoom: 0,
        maxZoom: 5,
        continuousWold: false,
        noWrap: true,
        crs: CRS.Simple,
      }).addTo(this.mapDiv);

      // Sets bounds of map
      this.mapDiv.setMaxBounds(
        new L.latLngBounds(
          this.mapDiv.unproject(this.mapSW, this.mapDiv.getMaxZoom()),
          this.mapDiv.unproject(this.mapNE, this.mapDiv.getMaxZoom())
        )
      );
      Markers.getSurveyMarker(this.mapDiv).addTo(this.mapDiv);
      Markers.getSurveyMarker(this.mapDiv).addTo(this.mapDiv);
      MapDataManager.getSpikePlantLocationMarkers().addTo(this.mapDiv);
    },
  },
  mounted() {
    // this.setupLeafletMap();
    this.$nextTick(() => {
      var map = this.$refs.mapRef.mapObject;
      var southWest = map.unproject(this.mapSW, map.getMaxZoom());
      var northEast = map.unproject(this.mapNE, map.getMaxZoom());
      this.imageBounds = new L.LatLngBounds(southWest, northEast);
    });
  },
};
</script>

<style scoped>
.map {
  width: 100%;
  background: white;
}
</style>