import AgentType from "@/enums/AgentType";
import LineupType from "@/enums/LineupType";
import MapType from "@/enums/MapType";
import SpikeLocation from "@/interfaces/SpikeLocation";
import LineupLocation from "@/interfaces/LineupLocation";

export interface FilterState {
    mapFilter: MapType;
    agentFilter: AgentType;
    lineupTypeFilter: LineupType;
    spikeFilter: string;
    spikesToDisplay: SpikeLocation[];
    locationsToDisplay: LineupLocation[];
}