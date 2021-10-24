import LocationInfo from './LocationInfo'

/**
 * A MapData interface.
 */
export default interface MapData {
    mapKey: string;
    postPlantLineup: LocationInfo[];
    spikeLocations: LocationInfo[];
}
