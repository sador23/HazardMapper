import {Observable, of} from "rxjs";
import {catchError, filter, map, mapTo, mergeMap} from "rxjs/operators";
import {FETCH_ELEVATION} from "../actions/mapActions";
import { ajax } from 'rxjs/ajax';
import { isOfType } from 'typesafe-actions';
import {genericError} from "../actions/errorActions";
import {sucessfulRegister} from "../actions/userManagementActions";



export const fetchElevationEpic = (action$ : any) => action$.pipe(
    filter(isOfType(FETCH_ELEVATION)),
    mergeMap((action : any) =>
        ajax.post('https://localhost:44370/api/hazardMapper/getElevation', {data : action.data},{ 'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Headers' : 'Content-Type',
            'Access-Control-Allow-Methods' : 'POST'} ).pipe(
            map(response => sucessfulRegister()),
            catchError((error ) => of(genericError(error.message)))
        )
    )
);