<template>
  <v-card color="black" dark flat tile>
    <v-window v-model="onboarding">
      <v-window-item v-for="location in locationInfos" :key="location.key">
        <v-card color="transparent" height="80vh">
          <v-card-text>
            <div class="gallary-text">{{ location.name }}</div>
          </v-card-text>
          <v-row align="center" justify="center">
            <v-img :src="location.img" height="73vh" contain />
          </v-row>
        </v-card>
      </v-window-item>
    </v-window>

    <v-card-actions class="justify-space-between">
      <v-btn text @click="prev">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-item-group v-model="onboarding" class="text-center" mandatory>
        <v-item
          v-for="n in length"
          :key="`btn-${n}`"
          v-slot="{ active, toggle }"
        >
          <v-btn :input-value="active" icon @click="toggle">
            <v-icon>mdi-record</v-icon>
          </v-btn>
        </v-item>
      </v-item-group>
      <v-btn text @click="next">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>


<script lang="ts">
import LocationInfo from "@/interfaces/LocationInfo";

export default {
  props: {
    locationInfos: {
      type: Array as () => LocationInfo[],
      required: true,
    },
  },
  data: () => ({
    onboarding: 0,
    length: 0,
  }),

  methods: {
    next() {
      this.onboarding =
        this.onboarding + 1 === this.length ? 0 : this.onboarding + 1;
    },
    prev() {
      this.onboarding =
        this.onboarding - 1 < 0 ? this.length - 1 : this.onboarding - 1;
    },
  },
  mounted() {
    this.length = this.locationInfos.length;
  },
};
</script>

<style>
.gallary-text {
  font-family: "Valorant";
  font-size: 2em !important;
  color: #ffffff;
}
</style>