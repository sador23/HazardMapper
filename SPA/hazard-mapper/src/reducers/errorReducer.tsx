import {initialState} from "../Store/store";
import {GENERIC_ERROR, GenericError} from "../actions/errorActions";

export function errorReducer(
    state = initialState.error,
    action: GenericError
) {
    switch (action.type) {
        case GENERIC_ERROR:
            return action.message;
        default:
            return state
    }
}
