<template>
  <v-slide-item v-slot="{ active, toggle }">
    <v-card
      :color="active ? 'primary' : 'grey lighten-1'"
      :img="active ? selectedImgPath : deselectedImgPath"
      dark
      class="ma-4"
      height="150"
      width="300"
      @click="toggle"
    >
      <v-card-text>
        <div class="map-text">{{ mapName }}</div>
      </v-card-text>

      <v-row class="fill-height" align="center" justify="center">
        <v-scale-transition>
          <v-icon
            v-if="active"
            color="white"
            size="48"
            v-text="'mdi-check-circle-outline'"
          ></v-icon>
        </v-scale-transition>
      </v-row>
    </v-card>
  </v-slide-item>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "MapFilterCards",
  props: {
    mapName: {
      type: String,
      required: true,
    },
    selectedImgPath: {
      type: String,
      required: true,
    },
    deselectedImgPath: {
      type: String,
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