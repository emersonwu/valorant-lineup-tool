<template>
  <div class="text-center popup">
    <v-dialog v-model="dialog" max-width="90vw">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
          Click Me
        </v-btn>
      </template>

      <LocationGallary />
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "LocationInfoPopup",
  data() {
    return {
      dialog: false,
    };
  },
  props: {
    locationMarker: {
      type: Array,
      required: true,
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  mounted() {
    console.log(this.locationMarker.locationInfo.img);
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