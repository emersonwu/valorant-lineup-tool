<template>
  <div>
    <l-marker
      v-if="getMarkerLatLng"
      :lat-lng="getMarkerLatLng"
      :icon="getIcon"
      @click="spikeClicked()"
    />
  </div>
</template>

<script lang="ts">
import SpikeLocation from "@/interfaces/SpikeLocation";
import { FilterMutations } from "@/store/filter/mutations";

import Icons from "../../leaflet_objects/Icons";
import { LMarker } from "vue2-leaflet";

export default {
  name: "SpikeMarker",
  components: {
    LMarker,
  },
  data() {
    return {
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
    spikeClicked() {
      this.spikeFilter =
        this.spikeFilter == this.spikeLocation.spikeKey
          ? null
          : this.spikeLocation.spikeKey;
    },
  },
  computed: {
    getMarkerLatLng(): Number[] {
      return [this.spikeLocation.location.lat, this.spikeLocation.location.lng];
    },
    getIcon(): any {
      return this.spikeFilter == this.spikeLocation.spikeKey
        ? Icons.selectedSpike
        : Icons.spike;
    },
    spikeFilter: {
      get(): string {
        return this.$store.getters.getSpikeFilter;
      },
      set(value: string): void {
        this.$store.commit(FilterMutations.SET_SPIKE_FILTER, value);
      },
    },
  },
};
</script>