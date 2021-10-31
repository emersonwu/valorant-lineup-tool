import AgentType from "@/enums/AgentType";
import LineupType from "@/enums/LineupType";
import MapType from "@/enums/MapType";
import { GetterTree } from "vuex";
import { RootState } from "../types";
import { FilterState } from "./types";

export const getters: GetterTree<FilterState, RootState> = {
    getMapFilter(state): MapType {
        return state.mapFilter;
    },
    getAgentFilter(state): AgentType {
        return state.agentFilter;
    },
    getLineupTypeFilter(state): LineupType {
        return state.lineupTypeFilter;
    }
}