import AgentType from "@/enums/AgentType";
import LineupType from "@/enums/LineupType";
import MapType from "@/enums/MapType";
import LocationInfo from "@/interfaces/LocationInfo";
import { MutationTree } from "vuex";
import { FilterState } from "./types";

export enum FilterMutations {
    SET_MAP_FILTER = "SET_MAP_FILTER",
    SET_AGENT_FILTER = "SET_AGENT_FILTER",
    SET_LINEUP_TYPE_FILTER = "SET_LINEUP_TYPE_FILTER",
    SET_ALL_LOCATIONS = "ADD_TO_ALL_LOCATIONS",
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
    [FilterMutations.SET_ALL_LOCATIONS](state, payload: LocationInfo[]) {
        state.allLocations = payload;
    },
}