<template>
  <l-marker :lat-lng="getLatLong()" :icon="getIcon"></l-marker>
</template>

<script lang="ts">
import LineupLocation from "@/interfaces/LineupLocation";
import Icons from "../leaflet_objects/Icons";
import { FilterMutations } from "@/store/filter/mutations";
import { LMarker } from "vue2-leaflet";

import AgentType from "@/enums/AgentType";

export default {
  name: "LineupMarkers",
  components: {
    LMarker,
  },
  data() {
    return {};
  },
  props: {
    lineupLocation: {
      type: Object as () => LineupLocation,
      required: true,
    },
  },
  mounted() {},
  methods: {
    getLatLong(): number[] {
      return [
        this.lineupLocation.location.xPixelCoordinate,
        this.lineupLocation.location.yPixelCoordinate,
      ];
    },
  },
  computed: {
    getIcon(): any {
      switch (this.agentFilter) {
        case AgentType.VIPER:
          return Icons.viperSmoke;
        default:
          return Icons.red;
      }
    },
    agentFilter: {
      get(): boolean {
        return this.$store.getters.getAgentFilter;
      },
      set(value: AgentType): void {
        this.$store.commit(FilterMutations.SET_AGENT_FILTER, value);
      },
    },
  },
};
</script>