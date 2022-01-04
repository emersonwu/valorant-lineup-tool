const L = require('leaflet');

export default class Icons {
    static spike = L.icon({
        iconUrl: "markers/spike-marker.png",
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -50],
    });

    static selectedSpike = L.icon({
        iconUrl: "markers/selected-spike-marker.png",
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -50],
    });

    static brimstoneMolly = L.icon({
        iconUrl: "markers/brimstone-molly-marker.png",
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -50],
    });

    static kayoMolly = L.icon({
        iconUrl: "markers/kayo-molly-marker.png",
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -50],
    });

    static killjoyMolly = L.icon({
        iconUrl: "markers/killjoy-molly-marker.png",
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -50],
    });

    static viperSmoke = L.icon({
        iconUrl: "markers/viper-smoke-marker.png",
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -50],
    });

    static viperSnakeBite = L.icon({
        iconUrl: "markers/viper-snake-bite-marker.png",
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -50],
    });

    static noAblility = L.icon({
        iconUrl: "markers/no-ability-marker.png",
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -50],
    });
}