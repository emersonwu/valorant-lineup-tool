import AgentType from "@/enums/AgentType";
import LineupType from "@/enums/LineupType";
import MapType from "@/enums/MapType";
import { Module } from "vuex";
import { RootState } from "../types";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { FilterState } from "./types";

const state: FilterState = {
    mapFilter: MapType.BIND,
    agentFilter: AgentType.VIPER,
    lineupTypeFilter: {} as LineupType[],
}

export const filter: Module<FilterState, RootState> = {
    state,
    getters,
    mutations,
}