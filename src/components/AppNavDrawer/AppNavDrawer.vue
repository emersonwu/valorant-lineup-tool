<template>
  <v-navigation-drawer
    v-model="isNavBarOpen"
    absolute
    temporary
    width="100%"
    style="max-width: 1000px"
  >
    <!-- Header -->
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="nav-drawer-header1"
          >Options
        </v-list-item-title>
      </v-list-item-content>
      <v-spacer></v-spacer>
      <v-icon large @click.stop="isNavBarOpen = !isNavBarOpen"
        >mdi-close</v-icon
      >
    </v-list-item>
    <v-divider></v-divider>

    <!-- Map -->
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="nav-drawer-header2">Map</v-list-item-title>
        <map-filter />
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>

    <!-- Hero -->
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="nav-drawer-header2">Hero</v-list-item-title>
        <agent-filter />
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { AppMutations } from "@/store/app/mutations";
import AgentFilter from "./AgentFilter.vue";
import MapFilter from "./MapFilter.vue";

import Vue from "vue";

export default Vue.extend({
  name: "AppNavDrawer",
  components: {
    AgentFilter,
    MapFilter,
  },
  computed: {
    isNavBarOpen: {
      get(): boolean {
        return this.$store.getters.isNavBarOpen;
      },
      set(value: boolean): void {
        this.$store.commit(AppMutations.SET_IS_NAV_BAR_OPEN, value);
      },
    },
  },
});
</script>

<style>
.v-list-item__title {
  font-family: "Valorant";
}
.nav-drawer-header1 {
  font-size: 3em !important;
}
.nav-drawer-header2 {
  font-size: 2em !important;
}
</style>