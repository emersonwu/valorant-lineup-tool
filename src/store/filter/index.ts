import AgentType from "@/enums/AgentType";
import LineupType from "@/enums/LineupType";
import MapType from "@/enums/MapType";
import { Module } from "vuex";
import { RootState } from "../types";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { FilterState } from "./types";

const state: FilterState = {
    mapFilter: null,
    agentFilter: null,
    lineupTypeFilter: null,
}

export const filter: Module<FilterState, RootState> = {
    state,
    getters,
    mutations,
}