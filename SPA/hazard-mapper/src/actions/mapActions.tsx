export const CHANGE_LAT = 'CHANGE_LAT';
export interface ChangeLat {
    type: typeof CHANGE_LAT;
    lat: number;
}

export const changeLat  = (lat : number)  : ChangeLat => {
    return {
        type : CHANGE_LAT,
        lat
    }
}

export const CHANGE_LNG = 'CHANGE_LNG';
export interface ChangeLng {
    type: typeof CHANGE_LNG;
    lng: number;
}

export const changeLng  = (lng : number)  : ChangeLng => {
    return {
        type : CHANGE_LNG,
        lng
    }
}

export const CHANGE_ZOOM = 'CHANGE_ZOOM';
export interface ChangeZoom {
    type: typeof CHANGE_ZOOM;
    zoom: number;
}

export const changeZoom  = (zoom : number)  : ChangeZoom => {
    return {
        type : CHANGE_ZOOM,
        zoom
    }
}