import AgentType from "@/enums/AgentType";
import LineupType from "@/enums/LineupType";
import MapType from "@/enums/MapType";
import SpikeLocation from "@/interfaces/SpikeLocation";
import LineupLocation from "@/interfaces/LineupLocation";
import { MutationTree } from "vuex";
import { FilterState } from "./types";

export enum FilterMutations {
    SET_MAP_FILTER = "SET_MAP_FILTER",
    SET_AGENT_FILTER = "SET_AGENT_FILTER",
    SET_LINEUP_TYPE_FILTER = "SET_LINEUP_TYPE_FILTER",
    SET_SPIKE_FILTER = "SET_SPIKE_FILTER",
    SET_SPIKES_TO_DISPLAY = "SET_SPIKES_TO_DISPLAY",
    SET_LOCATIONS_TO_DISPLAY = "SET_LOCATIONS_TO_DISPLAY",
}

export const mutations: MutationTree<FilterState> = {
    [FilterMutations.SET_MAP_FILTER](state, payload: MapType) {
        state.mapFilter = payload;
    },
    [FilterMutations.SET_AGENT_FILTER](state, payload: AgentType) {
        state.agentFilter = payload;
    },
    [FilterMutations.SET_LINEUP_TYPE_FILTER](state, payload: LineupType) {
        state.lineupTypeFilter = payload;
    },
    [FilterMutations.SET_SPIKE_FILTER](state, payload: string) {
        state.spikeFilter = payload;
    },
    [FilterMutations.SET_SPIKES_TO_DISPLAY](state, payload: SpikeLocation[]) {
        state.spikesToDisplay = payload;
    },
    [FilterMutations.SET_LOCATIONS_TO_DISPLAY](state, payload: LineupLocation[]) {
        state.locationsToDisplay = payload;
    },
}