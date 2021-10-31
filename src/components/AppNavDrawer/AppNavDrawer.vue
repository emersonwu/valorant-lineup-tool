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
        <v-list-item-title class="nav-drawer-header2">Agent</v-list-item-title>
        <agent-filter />
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>

    <!-- Ability -->
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="nav-drawer-header2"
          >Ability</v-list-item-title
        >
        <ability-filter />
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>

    <!-- Ability -->
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="nav-drawer-header2"
          >Temp Debug output</v-list-item-title
        >
        <v-list-item-title class="nav-drawer-header3">
          Map Selected: {{ getMapSelected }}</v-list-item-title
        >
        <v-list-item-title class="nav-drawer-header3">
          Agent Selected: {{ getAgentSelected }}</v-list-item-title
        >
        <v-list-item-title class="nav-drawer-header3">
          Ability Selected: {{ getAbilitySelected }}</v-list-item-title
        >
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { AppMutations } from "@/store/app/mutations";
import MapFilter from "./MapFilter.vue";
import AgentFilter from "./AgentFilter.vue";
import AbilityFilter from "./AbilityFilter.vue";

import Vue from "vue";
import LineupType from "@/enums/LineupType";
import AgentType from "@/enums/AgentType";
import MapType from "@/enums/MapType";

export default Vue.extend({
  name: "AppNavDrawer",
  components: {
    MapFilter,
    AgentFilter,
    AbilityFilter,
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
    // Below for debug testing
    getMapSelected() {
      let mapSelected = this.$store.getters.getMapFilter;
      if (mapSelected) {
        return MapType[mapSelected];
      }
      return "Nothing selected";
    },
    getAgentSelected() {
      let agentSelected = this.$store.getters.getAgentFilter;
      if (agentSelected) {
        return AgentType[agentSelected];
      }
      return "Nothing selected";
    },
    getAbilitySelected() {
      let abilitySelected = this.$store.getters.getLineupTypeFilter;
      console.log(abilitySelected);
      if (abilitySelected) {
        return LineupType[abilitySelected];
      }
      return "Nothing selected";
    },
    // Above for debug testing
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
.nav-drawer-header3 {
  font-size: 1em !important;
}
</style>