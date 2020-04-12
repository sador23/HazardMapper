// @ts-ignore
import {Observable} from "rxjs";
import {filter, map, mapTo, mergeMap} from "rxjs/operators";
import {LOGIN, saveJWT} from "../actions/userManagementActions";
import { ajax } from 'rxjs/ajax';
import { isOfType } from 'typesafe-actions';



export const loginEpic = (action$ : any) => action$.pipe(
    filter(isOfType(LOGIN)),
    mergeMap((action : any) =>
        ajax.post('https://localhost:44370/api/user/login', action.user ).pipe(
            map(response => saveJWT(response.response))
        )
    )
);