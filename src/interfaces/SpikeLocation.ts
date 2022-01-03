import Coordinate from './Coordinate';

export default class SpikeLocation {
    location: Coordinate;
    lineups: string[];

    constructor(location: Coordinate, lineups: string[]) {
        this.location = location;
        this.lineups = lineups;
    }
}