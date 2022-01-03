<template>
  <div>
    <l-marker v-if="getMarkerLatLng" :lat-lng="getMarkerLatLng" :icon="icon" />
  </div>
</template>

<script lang="ts">
import SpikeLocation from "@/interfaces/SpikeLocation";

import Icons from "../../leaflet_objects/Icons";
import { LMarker } from "vue2-leaflet";

export default {
  name: "SpikeMarker",
  components: {
    LMarker,
  },
  data() {
    return {
      icon: Icons.spike,
      dialog: false,
    };
  },
  props: {
    spikeLocation: {
      type: Object as () => SpikeLocation,
      required: true,
    },
  },
  methods: {
    alertClick() {
      alert("Click!");
    },
  },
  computed: {
    getMarkerLatLng(): Number[] {
      return [this.spikeLocation.location.lat, this.spikeLocation.location.lng];
    },
  },
};
</script>