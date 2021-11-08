import LocationInfo from "@/interfaces/LocationInfo";
import { Module } from "vuex";
import { RootState } from "../types";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { AppState } from "./types";

const state: AppState = {
    isNavBarOpen: false,
    isLocationInfoOpen: false,
    displayedLocationInfo: {} as LocationInfo,
}

export const app: Module<AppState, RootState> = {
    state,
    getters,
    mutations,
}