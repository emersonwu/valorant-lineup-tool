<template>
  <v-toolbar dark color="#dc3d4b">
    <v-app-bar-nav-icon
      @click.stop="isNavBarOpen = !isNavBarOpen"
    ></v-app-bar-nav-icon>
    <div class="d-flex align-center headerPadding">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        height="35"
        viewBox="0 0 100 100"
        width="35"
      >
        <path
          d="M99.25 48.66V10.28c0-.59-.75-.86-1.12-.39l-41.92 52.4a.627.627 0 00.49 1.02h30.29c.82 0 1.59-.37 2.1-1.01l9.57-11.96c.38-.48.59-1.07.59-1.68zM1.17 50.34L32.66 89.7c.51.64 1.28 1.01 2.1 1.01h30.29c.53 0 .82-.61.49-1.02L1.7 9.89c-.37-.46-1.12-.2-1.12.39v38.38c0 .61.21 1.2.59 1.68z"
          fill="#fff"
        ></path>
      </svg>

      <v-img
        alt="Valorant Lineup Guide Name"
        class="shrink mt-1 hidden-sm-and-down headerPadding"
        contain
        min-width="500"
        src="header/valorant-lineup-guide.png"
        width="100"
      />
    </div>
  </v-toolbar>
</template>

<script lang="ts">
import { AppMutations } from "@/store/app/mutations";
import Vue from "vue";

export default Vue.extend({
  name: "Header",
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

<style scoped>
.headerPadding {
  padding-left: 20px;
}
</style>
