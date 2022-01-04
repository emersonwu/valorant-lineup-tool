import Coordinate from './Coordinate';

export default class SpikeLocation {
    spikeKey: string;
    name: string;
    img: string;
    location: Coordinate;
    lineups: string[];

    constructor(spikeKey: string, name: string, img: string, location: Coordinate, lineups: string[]) {
        this.spikeKey = spikeKey;
        this.name = name;
        this.img = img;
        this.location = location;
        this.lineups = lineups;
    }
}