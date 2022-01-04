<template>
  <v-sheet class="mx-auto" elevation="8" max-width="95%">
    <v-slide-group
      v-model="model"
      class="pa-4"
      show-arrows
      center-active
      @change="selectAgent(model)"
    >
      <agent-filter-cards
        selectedImgPath="images/agents/viper-card.png"
        deselectedImgPath="images/agents/viper-card-greyscale.png"
      />
      <agent-filter-cards
        selectedImgPath="images/agents/killjoy-card.png"
        deselectedImgPath="images/agents/killjoy-card-greyscale.png"
      />
      <agent-filter-cards
        selectedImgPath="images/agents/kayo-card.png"
        deselectedImgPath="images/agents/kayo-card-greyscale.png"
      />
      <agent-filter-cards
        selectedImgPath="images/agents/brimstone-card.png"
        deselectedImgPath="images/agents/brimstone-card-greyscale.png"
      />
    </v-slide-group>
  </v-sheet>
</template>

<script lang="ts">
import AgentType from "@/enums/AgentType";
import { FilterMutations } from "@/store/filter/mutations";
import AgentFilterCards from "./AgentFilterCards.vue";

import Vue from "vue";

export default Vue.extend({
  name: "AgentFilter",
  components: {
    AgentFilterCards,
  },
  data() {
    return {
      model: 0,
    };
  },
  created() {
    this.agentFilter = AgentType.VIPER;
  },
  computed: {
    agentFilter: {
      get(): boolean {
        return this.$store.getters.getAgentFilter;
      },
      set(value: AgentType): void {
        this.$store.commit(FilterMutations.SET_AGENT_FILTER, value);
      },
    },
  },
  methods: {
    selectAgent(model: number | undefined) {
      if (model != undefined) {
        switch (model) {
          case 0:
            this.agentFilter = AgentType.VIPER;
            break;
          case 1:
            this.agentFilter = AgentType.KILLJOY;
            break;
          case 2:
            this.agentFilter = AgentType.KAYO;
            break;
          case 3:
            this.agentFilter = AgentType.BRIMSTONE;
            break;
          default:
            console.log(`Selected invalid agent filter of ${model}`);
        }
      } else {
        this.agentFilter = null;
      }
    },
  },
});
</script>
