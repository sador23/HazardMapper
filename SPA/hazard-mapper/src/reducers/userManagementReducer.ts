import {initialState} from "../Store/store";
import {LOGIN, LoginInterface, SAVEJWT, SaveJWT} from "../actions/userManagementActions";

export function userManagementReducer(
    state = initialState,
    action: SaveJWT | LoginInterface
) {
    console.log(action.type);
    switch (action.type) {
        case SAVEJWT:
            return Object.assign({}, state, {
                    jwt : action.jwt
                })
        default:
            return state
    }
}
