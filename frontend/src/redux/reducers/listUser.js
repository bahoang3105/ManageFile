import {
    DELETE_USER,
    RESET_PASS_USER,
    UPGRADE_TO_ADMIN,
    GET_USERS,
} from "../actionTypes";

const initialState = {
    users: null,
}

const listUser = (state = initialState, action) => {
    switch(action.type) {
        case DELETE_USER: {

        }
        case RESET_PASS_USER: {

        }
        case UPGRADE_TO_ADMIN: {

        }
        case GET_USERS: {
            return {
                ...state,
                users: action.payload.data
            }
        }
        default: 
            return state;
    }
}

export default listUser;