<template>
  <v-slide-item v-slot="{ active, toggle }">
    <v-card
      :color="active ? 'primary' : 'grey lighten-1'"
      :img="active ? selectedImgPath : deselectedImgPath"
      dark
      class="ma-4"
      height="200"
      width="100"
      @click="toggle"
    >
      <v-row class="fill-height" align="center" justify="center">
        <v-scale-transition>
          <v-icon
            v-if="active"
            color="white"
            size="48"
            v-text="'mdi-check-circle-outline'"
          ></v-icon>
        </v-scale-transition>
      </v-row>
    </v-card>
  </v-slide-item>
</template>

<script lang="ts">
import AgentType from "@/enums/AgentType";
import { FilterMutations } from "@/store/filter/mutations";
import Vue from "vue";

export default Vue.extend({
  name: "AgentFilterCards",
  props: {
    selectedImgPath: {
      type: String,
      required: true,
    },
    deselectedImgPath: {
      type: String,
      required: true,
    },
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
});
</script>