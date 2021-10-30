import LocationInfo from "@/interfaces/LocationInfo";
import { GetterTree } from "vuex";
import { RootState } from "../types";
import { AppState } from "./types";

export const getters: GetterTree<AppState, RootState> = {
    isNavBarOpen(state): boolean {
        return state.isNavBarOpen;
    },
    isLocationInfoOpen(state): boolean {
        return state.isLocationInfoOpen;
    },
    getDisplayedLocationInfo(state): LocationInfo {
        return state.displayedLocationInfo;
    }
}