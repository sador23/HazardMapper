import { combineEpics } from 'redux-observable';
import {loginEpic, registerEpic} from "./userManagementEpic";
import {fetchElevationEpic} from "./mapEpic";

export default combineEpics(
    loginEpic,
    registerEpic,
    fetchElevationEpic
);