import LocationInfo from '../interfaces/LocationInfo'
import MapData from '../interfaces/MapData'
import MapType from '../enums/MapType'

// Map imports
import bindMapData from '../data/bind.json'
const L = require('leaflet');


export default class MapDataManager {
    mapType: MapType;
    mapJson: MapData;
    spikeLocations: LocationInfo[] = [];

    constructor(mapType: MapType) {
        this.mapType = mapType;
        this.mapJson = this.getMapDataFromJson(mapType);
        this.spikeLocations = this.mapJson.spikeLocations;
    }

    private getMapDataFromJson(mapType: MapType): MapData {
        switch (mapType as MapType) {
            case MapType.BIND:
                console.log("json retrieved", bindMapData);
                return bindMapData;
            default:
                console.log(`Maptype of ${mapType} is not a valid or configured map type.`);
                // To prevent errors for now
                return bindMapData as MapData;
        }
    }

    public setSpikeLocations(): void {
        console.log(this.mapJson);
        for(const location in this.mapJson.spikeLocations);
        this.spikeLocations = this.mapJson.spikeLocations;
    }

    public getPostLineups(): LocationInfo[] {
        return this.mapJson.postPlantLineup;
    }

    public getMapKey(): string {
        return this.mapJson.mapKey;
    }

}