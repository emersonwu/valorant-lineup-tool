import Coordinate from './Coordinate';
import LocationInfo from './LocationInfo'
import SpikeData from './SpikeData';

/**
 * A MapData interface.
 */
export default interface MapData {
    mapKey: string;
    locations: LocationInfo[];
    coordinates: Coordinate[];
    spikeData: SpikeData[];
    viperMollys: string[];
    standardMollys: string[]
}
