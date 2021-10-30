<template>
  <v-sheet class="mx-auto" elevation="8" max-width="95%">
    <v-slide-group
      v-model="model"
      class="pa-4"
      show-arrows
      center-active
      @change="selectMap(model)"
    >
      <map-filter-cards
        mapName="Ascent"
        selectedImgPath="images/map/ascent-splash.png"
        deselectedImgPath="images/map/ascent-splash-greyscale.png"
      />
      <map-filter-cards
        mapName="Bind"
        selectedImgPath="images/map/bind-splash.png"
        deselectedImgPath="images/map/bind-splash-greyscale.png"
      />
      <map-filter-cards
        mapName="Breeze"
        selectedImgPath="images/map/breeze-splash.png"
        deselectedImgPath="images/map/breeze-splash-greyscale.png"
      />
      <map-filter-cards
        mapName="Fracture"
        selectedImgPath="images/map/fracture-splash.png"
        deselectedImgPath="images/map/fracture-splash-greyscale.png"
      />
      <map-filter-cards
        mapName="Haven"
        selectedImgPath="images/map/haven-splash.png"
        deselectedImgPath="images/map/haven-splash-greyscale.png"
      />
      <map-filter-cards
        mapName="Icebox"
        selectedImgPath="images/map/icebox-splash.png"
        deselectedImgPath="images/map/icebox-splash-greyscale.png"
      />
      <map-filter-cards
        mapName="Split"
        selectedImgPath="images/map/split-splash.png"
        deselectedImgPath="images/map/split-splash-greyscale.png"
      />
    </v-slide-group>
  </v-sheet>
</template>

<script lang="ts">
import { FilterMutations } from "@/store/filter/mutations";
import MapFilterCards from "./MapFilterCards.vue";
import MapType from "@/enums/MapType";

import Vue from "vue";

export default Vue.extend({
  name: "MapFilter",
  components: {
    MapFilterCards,
  },
  data() {
    return {
      model: null,
    };
  },

  computed: {
    mapFilter: {
      get(): MapType {
        return this.$store.getters.getMapFilter;
      },
      set(value: MapType): void {
        this.$store.commit(FilterMutations.SET_MAP_FILTER, value);
      },
    },
  },
  methods: {
    selectMap(model: number | undefined) {
      if (model != undefined) {
        switch (model) {
          case 0:
            this.mapFilter = MapType.ASCENT;
            break;
          case 1:
            this.mapFilter = MapType.BIND;
            break;
          case 2:
            this.mapFilter = MapType.BREEZE;
            break;
          case 3:
            this.mapFilter = MapType.FRACTURE;
            break;
          case 4:
            this.mapFilter = MapType.HAVEN;
            break;
          case 5:
            this.mapFilter = MapType.ICEBOX;
            break;
          case 6:
            this.mapFilter = MapType.SPLIT;
            break;
          default:
            console.log(`Selected invalid map filter of ${model}`);
        }
      } else {
        this.mapFilter = null;
      }
    },
  },
});
</script>
