import bindMapLineupData from '../data/bind.json'
import JsonUtils from './JsonUtils'

export default class BindMapLineupData {

    static getMarkerFromLineupJSON(json) {
        JsonUtils.createMarker(json.name, json.description, json.xPixelCoordinate, json.yPixelCoordinate, json.img);
    } 

    static getSpikePlantLocationMarkers() {
        const locations  = []; 
        for (var destination in bindMapLineupData.postPlant) {
            var origins = bindMapLineupData.postPlant[destination];
            for (var lineupOrigin in origins) {
                
            }
            return this.getMarkerFromLineupJSON(origins[lineupOrigin]);
        }
        console.log(locations);
    }


}