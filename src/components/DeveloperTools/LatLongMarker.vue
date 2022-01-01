<template>
  <div>
    <l-marker :icon="marker.icon" :lat-lng.sync="marker.position" draggable />
    <l-control class="lat-lng-display" position="bottomleft">
      {{ "lat: " + marker.position.lat.toString() }}
      <br />
      {{ "lng: " + marker.position.lng.toString() }}
    </l-control>
  </div>
</template>

<script lang="ts">
import Icons from "../../leaflet_objects/Icons";

import { LControl, LMarker } from "vue2-leaflet";

export default {
  name: "LatLongMarker",
  components: {
    LControl,
    LMarker,
  },
  data() {
    return {
      marker: {
        icon: Icons.noAblility,
        position: { lng: 0, lat: 0 },
      },
    };
  },
};
</script>

<style>
.lat-lng-display {
  background: #fff;
  padding: 0 0.5em;
  border: 1px solid #aaa;
  border-radius: 0.1em;
  font-size: 45px;
}
</style>