import {
    DELETE_USER,
    RESET_PASS_USER,
    UPGRADE_TO_ADMIN,
} from "../actionTypes";

const initialState = {
    users: null,
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case DELETE_USER: {

        }
        case RESET_PASS_USER: {

        }
        case UPGRADE_TO_ADMIN: {

        }
        default: 
            return state;
    }
}

export default reducer;