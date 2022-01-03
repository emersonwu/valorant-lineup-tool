import { Module } from "vuex";
import { RootState } from "../types";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { FilterState } from "./types";

const state: FilterState = {
    mapFilter: null,
    agentFilter: null,
    lineupTypeFilter: null,
    spikesToDisplay: [],
    locationsToDisplay: [],
}

export const filter: Module<FilterState, RootState> = {
    state,
    getters,
    mutations,
}