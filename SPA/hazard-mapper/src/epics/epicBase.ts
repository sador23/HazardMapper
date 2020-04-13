import { combineEpics } from 'redux-observable';
import {loginEpic, registerEpic} from "./userManagementEpic";

export default combineEpics(
    loginEpic,
    registerEpic
);