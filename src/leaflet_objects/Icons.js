import L from "leaflet";

export default class Icons {
    static spike = L.icon({
        iconUrl: "markers/spike.png",
        iconSize: [56, 86],
        iconAnchor: [28, 43],
        popupAnchor: [0, -50],
    });

    static red = L.icon({
        iconUrl: "markers/red.png",
        iconSize: [56, 86],
        iconAnchor: [28, 43],
        popupAnchor: [0, -50],
    });
}