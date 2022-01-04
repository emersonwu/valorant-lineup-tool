<template>
  <v-sheet class="mx-auto" elevation="8" max-width="95%">
    <v-slide-group
      v-model="model"
      class="pa-4"
      show-arrows
      center-active
      @change="selectSpike(model)"
    >
      <div v-if="spikesToDisplay.length > 0">
        <spike-filter-cards
          v-for="spikeLocation in spikesToDisplay"
          :key="spikeLocation.spikeKey"
          :spikeLocation="spikeLocation"
        />
      </div>
    </v-slide-group>
  </v-sheet>
</template>

<script lang="ts">
import { FilterMutations } from "@/store/filter/mutations";
import SpikeFilterCards from "./SpikeFilterCards.vue";
import SpikeLocation from "@/interfaces/SpikeLocation";

import Vue from "vue";

export default Vue.extend({
  name: "SpikeFilter",
  components: {
    SpikeFilterCards,
  },
  data() {
    return {
      model: null,
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
    spikeFilter: {
      get(): string {
        return this.$store.getters.getSpikeFilter;
      },
      set(value: string): void {
        this.$store.commit(FilterMutations.SET_SPIKE_FILTER, value);
      },
    },
  },
  watch: {
    spikeFilter: function () {
      // Sets the app draw filter when spike is clicked on map
      const hasSpikeKey = (spikeLocation: SpikeLocation) =>
        spikeLocation.spikeKey == this.spikeFilter;
      this.model =
        this.spikesToDisplay.findIndex(hasSpikeKey) == -1
          ? null
          : this.spikesToDisplay.findIndex(hasSpikeKey);
    },
  },
  methods: {
    selectSpike(model: number | undefined) {
      if (model != undefined) {
        this.spikeFilter = this.spikesToDisplay[model].spikeKey;
      } else {
        this.spikeFilter = null;
      }
    },
  },
});
</script>
