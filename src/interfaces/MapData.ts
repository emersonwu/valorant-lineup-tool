import Coordinate from './Coordinate';
import LocationInfo from './LocationInfo'
import SpikeLineups from './SpikeLineups';

/**
 * A MapData interface.
 */
export default interface MapData {
    mapKey: string;
    locations: LocationInfo[];
    coordinates: Coordinate[];
    spikeLineups: SpikeLineups[];
    viperMollys: string[];
    standardMollys: string[]
}
