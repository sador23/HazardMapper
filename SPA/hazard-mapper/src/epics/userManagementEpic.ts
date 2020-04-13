// @ts-ignore
import {Observable, of} from "rxjs";
import {catchError, filter, map, mapTo, mergeMap} from "rxjs/operators";
import {LOGIN, REGISTER, saveJWT, sucessfulRegister} from "../actions/userManagementActions";
import { ajax } from 'rxjs/ajax';
import { isOfType } from 'typesafe-actions';
import {genericError} from "../actions/errorActions";



export const loginEpic = (action$ : any) => action$.pipe(
    filter(isOfType(LOGIN)),
    mergeMap((action : any) =>
        ajax.post('https://localhost:44370/api/user/login', action.user,{ 'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Headers' : 'Content-Type',
        'Access-Control-Allow-Methods' : 'POST'} ).pipe(
            map(response => saveJWT(response.response.token)),
            catchError((error ) => of(genericError(error.message)))
        )
    )
);


export const registerEpic = (action$ : any) => action$.pipe(
    filter(isOfType(REGISTER)),
    mergeMap((action : any) =>
        ajax.post('https://localhost:44370/api/user/register', action.model,{ 'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Headers' : 'Content-Type',
            'Access-Control-Allow-Methods' : 'POST'} ).pipe(
            map(response => sucessfulRegister()),
            catchError((error ) => of(genericError(error.message)))
        )
    )
);