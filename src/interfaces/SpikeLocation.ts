import Coordinate from './Coordinate';

export default class SpikeLocation {
    spikeKey: string;
    name: string;
    imgUnselected: string;
    imgSelected: string;
    location: Coordinate;
    lineups: string[];

    constructor(spikeKey: string, name: string, img: string, location: Coordinate, lineups: string[]) {
        this.spikeKey = spikeKey;
        this.name = name;
        this.imgSelected = img;
        // TODO: add into code some way to not do this hack on the string that has to end with .png
        this.imgUnselected = img.slice(0, -4) + "Unselected.png";
        this.location = location;
        this.lineups = lineups;
    }
}