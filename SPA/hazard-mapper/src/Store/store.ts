interface State {
    jwt : string;
    error : string;
    lat: number;
    lng : number;
    zoom : number;
}

export const initialState : State = {
    jwt: "",
    error: "",
    lat: 47.497913,
    lng: 19.040236,
    zoom: 13
}

