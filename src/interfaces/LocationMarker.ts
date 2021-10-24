import LocationInfo from './LocationInfo'

export default class LocationMarker {
    locationInfo: LocationInfo;
    marker: any;

    constructor(locationInfo: LocationInfo) {
        this.locationInfo = locationInfo;
    }

}