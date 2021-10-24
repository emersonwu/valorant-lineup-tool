const L = require('leaflet');
import Icons from "./Icons";

export default class Markers {
    // static getSurveyMarker(mapDiv: ) {
    //     const marker = L.marker(mapDiv.unproject([0, 0], mapDiv.getMaxZoom()), {
    //         icon: Icons.spike,
    //         draggable: true,
    //     });

    //     marker
    //         .bindPopup(
    //             "Clicked " +
    //             marker.getLatLng().toString() +
    //             "<br />" +
    //             "Pixels " +
    //             mapDiv.project(marker.getLatLng(), mapDiv.getMaxZoom().toString())
    //         )
    //         .openPopup();

    //     marker.on("dragend", () => {
    //         marker
    //             .getPopup()
    //             .setContent(
    //                 "Clicked " +
    //                 marker.getLatLng().toString() +
    //                 "<br />" +
    //                 "Pixels " +
    //                 mapDiv.project(marker.getLatLng(), mapDiv.getMaxZoom().toString())
    //             )
    //             .openOn(mapDiv);
    //     });

    //     return marker;
    // }
}