// @ts-ignore
import {LoginModel} from "../common/Login";
import {RegisterModel} from "../common/RegisterModel";

export const LOGIN = 'LOGIN';
export interface LoginInterface {
    type : typeof LOGIN;
    user : LoginModel;
}

export const login  = (user : LoginModel)  : LoginInterface => {
    console.log(user.password);
    return {
        type : LOGIN,
        user : user
    }
}

export interface RegisterInterface{
    type :typeof REGISTER;
    model : RegisterModel;
}

export const REGISTER = "REGISTER";
export const register = (model : RegisterModel) : RegisterInterface => {
    return{
        type: REGISTER,
        model : model
    }
}

export const SAVEJWT = "SAVEJWT";
export interface SaveJWT{
    type :typeof SAVEJWT;
    jwt : string;
}

export const saveJWT = (jwt : string) : SaveJWT => {
    return{
        type: SAVEJWT,
        jwt : jwt
    }
}


export const SUCCESSFUL_REGISTER = "SUCCESSFUL_REGISTER";
export interface SucessfulRegister{
    type :typeof SUCCESSFUL_REGISTER;
}

export const sucessfulRegister = () : SucessfulRegister => {
    return{
        type: SUCCESSFUL_REGISTER,
    }
}

export type UserManagementActions = LoginInterface | RegisterInterface | SaveJWT;