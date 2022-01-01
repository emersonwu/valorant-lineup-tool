<template>
  <div>
    <l-marker
      v-if="getMarkerLatLng"
      :lat-lng="getMarkerLatLng"
      :icon="getIcon"
      @click="dialog = true"
    />
    <v-dialog v-model="dialog" max-width="90vw">
      <location-gallary :locationInfos="lineupLocation.lineups" />
    </v-dialog>
  </div>
</template>

<script lang="ts">
import LineupLocation from "@/interfaces/LineupLocation";
import LocationGallary from "./LocationGallary.vue";

import Icons from "../leaflet_objects/Icons";
import { FilterMutations } from "@/store/filter/mutations";
import { LMarker } from "vue2-leaflet";
import LineupType from "@/enums/LineupType";
import AgentType from "@/enums/AgentType";

export default {
  name: "LineupMarker",
  components: {
    LMarker,
    LocationGallary,
  },
  data() {
    return {
      dialog: false,
    };
  },
  props: {
    lineupLocation: {
      type: Object as () => LineupLocation,
      required: true,
    },
  },
  methods: {
    alertClick() {
      alert("Click!");
    },
  },
  computed: {
    getMarkerLatLng(): Number[] {
      return [
        this.lineupLocation.location.lat,
        this.lineupLocation.location.lng,
      ];
    },
    getIcon(): any {
      switch (this.agentFilter) {
        case AgentType.BRIMSTONE:
          return Icons.brimstoneMolly;
        case AgentType.KAYO:
          return Icons.kayoMolly;
        case AgentType.KILLJOY:
          return Icons.killjoyMolly;
        case AgentType.VIPER:
          if (this.abilityFilter == LineupType.VIPER_MOLLY) {
            return Icons.viperSnakeBite;
          } else {
            return Icons.viperSmoke;
          }
        default:
          return Icons.noAblility;
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
    abilityFilter: {
      get(): LineupType {
        return this.$store.getters.getLineupTypeFilter;
      },
      set(value: LineupType): void {
        this.$store.commit(FilterMutations.SET_LINEUP_TYPE_FILTER, value);
      },
    },
  },
};
</script>