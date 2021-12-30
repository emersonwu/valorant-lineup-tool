import Coordinate from './Coordinate';
import LocationInfo from './LocationInfo'

export default class LineupLocation {
    location: Coordinate;
    lineups: LocationInfo[] = [];

    constructor(location: Coordinate) {
        this.location = location;
    }

    addLineup(lineup: LocationInfo) {
        this.lineups.push(lineup);
    }
}