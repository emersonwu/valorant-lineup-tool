<template>
  <div id="mapContainer" />
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Markers from "../leaflet_objects/Markers";
import BindMapLineupData from "../utils/BindMapData";


export default {
  name: "Map",
  data() {
    return {
      center: [0, 0],
      mapSW: [0, 7680],
      mapNE: [7680, 0],
      mapDiv: {},
    };
  },
  methods: {
    setupLeafletMap: function () {
      this.mapDiv = L.map("mapContainer").setView(this.center, 2);
      L.tileLayer("tiles/{z}/{y}/{x}.png", {
        minZoom: 0,
        maxZoom: 5,
        continuousWold: false,
        noWrap: true,
        crs: L.CRS.Simple,
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
      BindMapLineupData.getSpikePlantLocationMarkers().addTo(this.mapDiv);
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