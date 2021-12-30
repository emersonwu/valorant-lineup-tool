import AgentType from "@/enums/AgentType";
import LineupType from "@/enums/LineupType";
import MapType from "@/enums/MapType";
import LineupLocation from "@/interfaces/LineupLocation";
import { MutationTree } from "vuex";
import { FilterState } from "./types";

export enum FilterMutations {
    SET_MAP_FILTER = "SET_MAP_FILTER",
    SET_AGENT_FILTER = "SET_AGENT_FILTER",
    SET_LINEUP_TYPE_FILTER = "SET_LINEUP_TYPE_FILTER",
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
    [FilterMutations.SET_LOCATIONS_TO_DISPLAY](state, payload: LineupLocation[]) {
        state.locationsToDisplay = payload;
    },
}