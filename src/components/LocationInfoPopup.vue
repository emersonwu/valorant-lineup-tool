<template>
  <div class="text-center popup">
    <l-marker
      :lat-lng="[-128, 128]"
      :icon="icon"
      v-bind="attrs"
      v-on="on"
      @click="dialog = !dialog"
    />
    <v-dialog v-model="dialog" max-width="90vw">
      <location-gallary />
    </v-dialog>
  </div>
</template>

<script>
import { LMarker } from "vue2-leaflet";
import Icons from "../leaflet_objects/Icons";
import LocationGallary from "./LocationGallary.vue";

export default {
  name: "LocationInfoPopup",
  components: {
    LocationGallary,
    LMarker,
  },
  data() {
    return {
      dialog: false,
      icon: Icons.spike,
    };
  },
  props: {
    // locationMarker: {
    //   type: Array,
    //   required: true,
    // },
    // isOpen: {
    //   type: Boolean,
    //   required: true,
    // },
  },
  mounted() {
    // console.log(this.locationMarker.locationInfo.img);
  },
};
</script>

<style lang="scss" scoped>
.popup {
  z-index: 2001;
}

.fill {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  flex-shrink: 0;
}
</style>