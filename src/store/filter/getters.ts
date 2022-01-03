import AgentType from "@/enums/AgentType";
import LineupType from "@/enums/LineupType";
import MapType from "@/enums/MapType";
import SpikeLocation from "@/interfaces/SpikeLocation";
import LineupLocation from "@/interfaces/LineupLocation";
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
    },
    getSpikesToDisplay(state): SpikeLocation[] {
        return state.spikesToDisplay;
    },
    getLocationsToDisplay(state): LineupLocation[] {
        return state.locationsToDisplay;
    }
}