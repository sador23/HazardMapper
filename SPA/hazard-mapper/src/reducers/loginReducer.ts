import {initialState} from "../Store/store";
import {LOGIN, LoginInterface, SAVEJWT, SaveJWT} from "../actions/userManagementActions";

export function loginReducer(
    state = initialState.jwt,
    action: SaveJWT | LoginInterface
) {
    switch (action.type) {
        case SAVEJWT:
            return action.jwt;
        default:
            return state;
    }
}
