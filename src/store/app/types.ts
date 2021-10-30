import LocationInfo from "@/interfaces/LocationInfo";

export interface AppState {
    isNavBarOpen: boolean;
    isLocationInfoOpen: boolean;
    displayedLocationInfo: LocationInfo;
}