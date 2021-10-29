import AgentType from "@/enums/AgentType";
import LineupType from "@/enums/LineupType";
import MapType from "@/enums/MapType";

export interface FilterState {
    mapFilter: MapType;
    agentFilter: AgentType;
    lineupTypeFilter: LineupType[];
}