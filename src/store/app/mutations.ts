import LocationInfo from "@/interfaces/LocationInfo";
import { MutationTree } from "vuex";
import { AppState } from "./types";

export enum AppMutations {
    SET_IS_NAV_BAR_OPEN = "SET_IS_NAV_BAR_OPEN",
    SET_IS_LOCATION_INFO_OPEN = "SET_IS_LOCATION_INFO_OPEN",
    SET_DISPLAYED_LOCATION_INFO = "SET_DISPLAYED_LOCATION_INFO",
}

export const mutations: MutationTree<AppState> = {
    [AppMutations.SET_IS_NAV_BAR_OPEN](state, payload: boolean) {
        state.isNavBarOpen = payload;
    },
    [AppMutations.SET_IS_LOCATION_INFO_OPEN](state, payload: boolean) {
        state.isLocationInfoOpen = payload;
    },
    [AppMutations.SET_DISPLAYED_LOCATION_INFO](state, payload: LocationInfo) {
        state.displayedLocationInfo = payload;
    },
}