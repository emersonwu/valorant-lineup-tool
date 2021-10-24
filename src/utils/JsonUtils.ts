import Icons from "../leaflet_objects/Icons";
import MapData from "../interfaces/MapData"
const L = require('leaflet');


export default class JsonUtils {

    static loadMap(filepath: string): MapData {
        // console.log(name, description, xPixelCoordinate, yPixelCoordinate, img);
        const marker = L.marker([0,0], {
            icon: Icons.red,
            draggable: true,
        });
        return marker;
    }
}