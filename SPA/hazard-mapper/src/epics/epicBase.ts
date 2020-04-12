import { combineEpics } from 'redux-observable';
import {loginEpic} from "./userManagementEpic";

export default combineEpics(
    loginEpic
);