import L from "leaflet";
import Icons from "../leaflet_objects/Icons";

export default class JsonUtils {

    static createMarker(name, description, xPixelCoordinate, yPixelCoordinate, img) {
        console.log(name, description, xPixelCoordinate, yPixelCoordinate, img);
        var marker = L.marker([0,0], {
            icon: Icons.red,
            draggable: true,
        });
        return marker;
    }
}