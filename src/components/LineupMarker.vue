<template>
  <l-marker
    v-if="getMarkerLatLng"
    :lat-lng="getMarkerLatLng"
    :icon="getIcon"
  ></l-marker>
</template>

<script lang="ts">
import LineupLocation from "@/interfaces/LineupLocation";
import Icons from "../leaflet_objects/Icons";
import { FilterMutations } from "@/store/filter/mutations";
import { LMarker } from "vue2-leaflet";

import AgentType from "@/enums/AgentType";

export default {
  name: "LineupMarker",
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
  methods: {},
  computed: {
    getMarkerLatLng(): Number[] {
      console.log("getMarkerLatLng()", this.lineupLocation.location);
      return this.lineupLocation.location;
    },
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