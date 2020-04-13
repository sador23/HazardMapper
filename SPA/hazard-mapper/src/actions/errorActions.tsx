export const GENERIC_ERROR = 'GENERIC_ERROR';
export interface GenericError {
    type: typeof GENERIC_ERROR;
    message:string;
}

export const genericError  = (message : string)  : GenericError => {
    return {
        type : GENERIC_ERROR,
        message
    }
}