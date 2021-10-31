<template>
  <v-slide-item v-slot="{ active, toggle }">
    <v-card
      :color="active ? 'primary' : 'grey lighten-1'"
      :img="active ? selectedImgPath : deselectedImgPath"
      dark
      class="ma-4"
      height="150"
      width="150"
      @click="toggle"
      :disabled="disabled"
    >
      <v-row class="fill-height" align="center" justify="center">
        <v-scale-transition>
          <v-icon
            v-if="active"
            color="white"
            size="65"
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
  name: "AbilityFilterCards",
  props: {
    selectedImgPath: {
      type: String,
      required: false,
    },
    deselectedImgPath: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
  },
});
</script>

<style>
.ability-text {
  font-family: "Valorant";
  font-size: 1.3em !important;
  color: #ffffff;
}
</style>