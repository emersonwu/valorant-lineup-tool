<template>
  <v-sheet class="mx-auto" elevation="8" max-width="95%">
    <v-slide-group
      v-model="model"
      class="pa-4"
      show-arrows
      center-active
      @change="selectAbility(model)"
    >
      <!-- Empty placeholder ability when no agents are selected -->
      <ability-filter-cards
        v-show="!isAgentSelected"
        deselectedImgPath="images/ability/no-ability.png"
        disabled
      />
      <ability-filter-cards
        v-show="isAgentSelected"
        :selectedImgPath="getSelectedMollyImgPath"
        :deselectedImgPath="getdeselectedMollyImgPath"
      />
      <ability-filter-cards
        v-show="isViperSelected"
        selectedImgPath="images/ability/viper-snake-bite.png"
        deselectedImgPath="images/ability/viper-snake-bite-greyscale.png"
      />
    </v-slide-group>
  </v-sheet>
</template>

<script lang="ts">
import { FilterMutations } from "@/store/filter/mutations";
import AbilityFilterCards from "./AbilityFilterCards.vue";
import AgentType from "@/enums/AgentType";
import LineupType from "@/enums/LineupType";
import Vue from "vue";

export default Vue.extend({
  name: "AbilityFilter",
  components: {
    AbilityFilterCards,
  },
  data() {
    return {
      model: 2,
    };
  },
  created() {
    this.abilityFilter = LineupType.VIPER_MOLLY;
  },
  computed: {
    abilityFilter: {
      get(): LineupType {
        return this.$store.getters.getLineupTypeFilter;
      },
      set(value: LineupType): void {
        this.$store.commit(FilterMutations.SET_LINEUP_TYPE_FILTER, value);
      },
    },
    agentFilter: {
      get(): boolean {
        return this.$store.getters.getAgentFilter;
      },
      set(value: AgentType): void {
        this.$store.commit(FilterMutations.SET_AGENT_FILTER, value);
      },
    },
    getSelectedMollyImgPath(): string {
      switch (this.agentFilter) {
        case AgentType.BRIMSTONE:
          return "images/ability/brimstone-incendiary.png";
        case AgentType.KAYO:
          return "images/ability/kayo-frag.png";
        case AgentType.KILLJOY:
          return "images/ability/killjoy-nanoswam.png";
        case AgentType.VIPER:
          return "images/ability/viper-poison-cloud.png";
        default:
          return "";
      }
    },
    getdeselectedMollyImgPath(): string {
      let selectedMollyImgPath = this.getSelectedMollyImgPath;
      return (
        selectedMollyImgPath.slice(0, -4) +
        "-greyscale" +
        selectedMollyImgPath.slice(-4)
      );
    },
    isViperSelected(): boolean {
      return this.agentFilter == AgentType.VIPER;
    },
    isAgentSelected(): boolean {
      return this.agentFilter;
    },
  },
  watch: {
    agentFilter: function () {
      // If no agent is selected clear the ability filter
      if (
        this.agentFilter == null ||
        (this.abilityFilter == LineupType.VIPER_MOLLY &&
          this.agentFilter != AgentType.VIPER)
      ) {
        this.abilityFilter = null;
        this.model = null;
      }
    },
  },
  methods: {
    selectAbility(model: number | undefined) {
      if (model != undefined) {
        switch (model) {
          case 1:
            this.abilityFilter = LineupType.STANDARD_MOLLY;
            break;
          case 2:
            this.abilityFilter = LineupType.VIPER_MOLLY;
            break;
          default:
            console.log(`Selected invalid map filter of ${model}`);
        }
      } else {
        this.abilityFilter = null;
      }
    },
  },
});
</script>
