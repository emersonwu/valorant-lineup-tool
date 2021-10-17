<template>
  <div id="mapContainer" />
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default {
  name: "Map",
  data() {
    return {
      center: [0, 0],
      mapSW: [0, 7680],
      mapNE: [7680, 0],
    };
  },
  methods: {
    setupLeafletMap: function () {
      const mapDiv = L.map("mapContainer").setView(this.center, 2);
      L.tileLayer("tiles/{z}/{y}/{x}.png", {
        minZoom: 0,
        maxZoom: 5,
        continuousWold: false,
        noWrap: true,
        crs: L.CRS.Simple,
      }).addTo(mapDiv);

      // Sets bounds of map
      mapDiv.setMaxBounds(
        new L.latLngBounds(
          mapDiv.unproject(this.mapSW, mapDiv.getMaxZoom()),
          mapDiv.unproject(this.mapNE, mapDiv.getMaxZoom())
        )
      );
    },
  },
  mounted() {
    this.setupLeafletMap();
  },
};
</script>

<style scoped>
#mapContainer {
  width: 100%;
  height: 100vh;
  background: white;
}
</style>