<template>
  <v-slide-item v-slot="{ active, toggle }" v-if="spikeLocation">
    <v-card
      :color="active ? 'primary' : 'grey lighten-1'"
      :img="active ? spikeLocation.imgSelected : spikeLocation.imgUnselected"
      dark
      class="ma-4"
      height="150"
      width="300"
      @click="toggle"
    >
      <v-row class="fill-height" align="center" justify="center">
        <v-scale-transition>
          <v-icon
            v-if="active"
            color="white"
            size="60"
            v-text="'mdi-check-circle-outline'"
          ></v-icon>
        </v-scale-transition>
      </v-row>
    </v-card>
  </v-slide-item>
</template>

<script lang="ts">
import SpikeLocation from "@/interfaces/SpikeLocation";

import Vue from "vue";

export default Vue.extend({
  name: "SpikeFilterCards",
  props: {
    spikeLocation: {
      type: SpikeLocation,
      required: true,
    },
  },
});
</script>

<style>
.map-text {
  font-family: "Valorant";
  font-size: 3em !important;
  color: #ffffff;
}
</style>