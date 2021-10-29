import AgentType from "@/enums/AgentType";
import LineupType from "@/enums/LineupType";
import MapType from "@/enums/MapType";
import { MutationTree } from "vuex";
import { FilterState } from "./types";

export enum FilterMutations {
    SET_MAP_FILTER = "SET_MAP_FILTER",
    SET_AGENT_FILTER = "SET_AGENT_FILTER",
    ADD_LINEUP_TYPE_FILTER = "ADD_LINEUP_TYPE_FILTER",
    REMOVE_LINEUP_TYPE_FILTER = "REMOVE_LINEUP_TYPE_FILTER",
}

export const mutations: MutationTree<FilterState> = {
    [FilterMutations.SET_MAP_FILTER](state, payload: MapType) {
        state.mapFilter = payload;
    },
    [FilterMutations.SET_AGENT_FILTER](state, payload: AgentType) {
        state.agentFilter = payload;
    },
    [FilterMutations.ADD_LINEUP_TYPE_FILTER](state, payload: LineupType) {
        state.lineupTypeFilter.push(payload);
    },
    [FilterMutations.REMOVE_LINEUP_TYPE_FILTER](state, payload: LineupType) {
        const index = state.lineupTypeFilter.indexOf(payload);
        if (index > -1) {
            state.lineupTypeFilter.splice(index, 1);
        }
    },
}