import AgentType from "@/enums/AgentType";
import LineupType from "@/enums/LineupType";
import MapType from "@/enums/MapType";
import LocationInfo from "@/interfaces/LocationInfo";

export interface FilterState {
    mapFilter: MapType;
    agentFilter: AgentType;
    lineupTypeFilter: LineupType;
    allLocations: LocationInfo[];
}