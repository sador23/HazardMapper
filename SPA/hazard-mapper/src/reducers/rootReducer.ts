import { combineReducers } from 'redux';
import { loginReducer} from "./loginReducer";
import {errorReducer} from "./errorReducer";
import {latReducer, lngReducer, zoomReducer} from "./mapReducer";

export default combineReducers({
    jwt: loginReducer,
    error: errorReducer,
    zoom: zoomReducer,
    lat: latReducer,
    lng: lngReducer
});