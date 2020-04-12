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

interface Register{
    type :typeof REGISTER;
    model : RegisterModel;
}

const REGISTER = "REGISTER";
const register = (model : RegisterModel) : Register => {
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

export type UserManagementActions = LoginInterface | Register | SaveJWT;