import LocationInfo from '../interfaces/LocationInfo'
import MapData from '../interfaces/MapData'
import MapType from '@/enums/MapType'

// Map imports
import bindAMapData from '../data/bindA.json';
import bindBMapData from '../data/bindB.json'
import Coordinate from '@/interfaces/Coordinate';

export default class MapDataManager {
    mapType: MapType;
    mapJsons: MapData[];
    locations: Map<string, LocationInfo> = new Map();
    coordinates: Map<string, Coordinate> = new Map();
    spikeLineups: Map<string, String[]> = new Map();


    constructor(mapType: MapType) {
        this.mapType = mapType;
        this.mapJsons = this.getMapDataFromJson(mapType);
        this.setLocations();
        this.setCoordinates();
        this.setSpikeLineups();
    }

    private getMapDataFromJson(mapType: MapType): MapData[] {
        switch (mapType as MapType) {
            case MapType.BIND:
                return [bindAMapData, bindBMapData];
            default:
                console.log(`Maptype of ${mapType} is not a valid or configured map type.`);
                // To prevent errors for now
                return [bindAMapData, bindBMapData];
        }
    }

    public setLocations(): void {
        this.mapJsons.forEach((mapJson) => {
            mapJson.locations.forEach((locationInfo) => {
                this.locations.set(locationInfo.key, locationInfo)
            })
        })
    }

    public setCoordinates(): void {
        this.mapJsons.forEach((mapJson) => {
            mapJson.coordinates.forEach((coordinate) => {
                this.coordinates.set(coordinate.key, coordinate)
            })
        })
    }

    public setSpikeLineups(): void {
        this.mapJsons.forEach((mapJson) => {
            mapJson.spikeLineups.forEach((spikeLineup) => {
                this.spikeLineups.set(spikeLineup.spikeKey, spikeLineup.lineupKeys)
            })
        })
    }

    public getViperMollys(): string[] {
        const viperMolly: string[] = [];
        this.mapJsons.forEach((mapJson) => viperMolly.push(...mapJson.viperMollys));
        return viperMolly;
    }

    public getStandardMollys(): string[] {
        const standardMolly: string[] = [];
        this.mapJsons.forEach((mapJson) => standardMolly.push(...mapJson.standardMollys));
        return standardMolly;
    }
}