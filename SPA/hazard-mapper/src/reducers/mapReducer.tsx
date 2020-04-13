import {initialState} from "../Store/store";
import {CHANGE_LAT, CHANGE_LNG, CHANGE_ZOOM, ChangeLat, ChangeLng, ChangeZoom} from "../actions/mapActions";

export function latReducer(
    state = initialState.lat,
    action: ChangeLat
) {
    switch (action.type) {
        case CHANGE_LAT:
            return action.lat;
        default:
            return state
    }
}

export function lngReducer(
    state = initialState.lng,
    action: ChangeLng
) {
    switch (action.type) {
        case CHANGE_LNG:
            return action.lng;
        default:
            return state
    }
}

export function zoomReducer(
    state = initialState.zoom,
    action: ChangeZoom
) {
    switch (action.type) {
        case CHANGE_ZOOM:
            return action.zoom;
        default:
            return state
    }
}
