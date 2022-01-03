import LocationInfo from '../interfaces/LocationInfo'
import MapData from '../interfaces/MapData'
import MapType from '@/enums/MapType'

// Map imports
import bindMapData from '../data/bind.json'
import Coordinate from '@/interfaces/Coordinate';

export default class MapDataManager {
    mapType: MapType;
    mapJson: MapData;
    locations: Map<string, LocationInfo> = new Map();
    coordinates: Map<string, Coordinate> = new Map();
    spikeLineups: Map<string, String[]> = new Map();


    constructor(mapType: MapType) {
        this.mapType = mapType;
        this.mapJson = this.getMapDataFromJson(mapType);
        this.setLocations();
        this.setCoordinates();
        this.setSpikeLineups();
    }

    private getMapDataFromJson(mapType: MapType): MapData {
        switch (mapType as MapType) {
            case MapType.BIND:
                console.log("json retrieved", bindMapData);
                return bindMapData;
            default:
                console.log(`Maptype of ${mapType} is not a valid or configured map type.`);
                // To prevent errors for now
                return bindMapData;
        }
    }

    public setLocations(): void {
        this.mapJson.locations.forEach((locationInfo) => {
            this.locations.set(locationInfo.key, locationInfo)
        })
    }

    public setCoordinates(): void {
        this.mapJson.coordinates.forEach((coordinate) => {
            this.coordinates.set(coordinate.key, coordinate)
        })
    }

    public setSpikeLineups(): void {
        this.mapJson.spikeLineups.forEach((spikeLineup) => {
            this.spikeLineups.set(spikeLineup.spikeKey, spikeLineup.lineupKeys)
        })
    }

    public getViperMollys(): string[] {
        return this.mapJson.viperMollys;
    }

    public getStandardMollys(): string[] {
        return this.mapJson.standardMollys;
    }

}