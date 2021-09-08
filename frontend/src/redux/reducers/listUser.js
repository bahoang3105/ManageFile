import {
    DELETE_USER,
    RESET_PASS_USER,
    UPGRADE_TO_ADMIN,
    GET_USERS,
    LOGOUT,
} from "../actionTypes";

const initialState = {
    users: null,
}

const listUser = (state = initialState, action) => {
    switch(action.type) {
        case DELETE_USER: {
            const id = action.payload;
            let place;
            for(let i = 0; i < state.users.length; i++) {
                if(parseInt(id) === state.users[i].userID) {
                    place = i;
                    break;
                }
            }
            return {
                ...state,
                users: [
                    ...state.users.slice(0, place),
                    ...state.users.slice(place+1)
                ]
            };
        }
        case RESET_PASS_USER: {
            return state;
        }
        case UPGRADE_TO_ADMIN: {
            const id = action.payload;
            let place;
            for(let i = 0; i < state.users.length; i++) {
                if(parseInt(id) === state.users[i].userID) {
                    place = i;
                    break;
                }
            }
            return {
                ...state,
                users: [
                    ...state.users.slice(0, place),
                    {
                        userID: state.users[place].userID,
                        username: state.users[place].username,
                        role: 1,
                    },
                    ...state.users.slice(place+1)
                ]
            }
        }
        case GET_USERS: {
            return {
                ...state,
                users: action.payload.data
            }
        }
        case LOGOUT: {
            return {
                ...state,
                users: null
            }
        }
        default: 
            return state;
    }
}

export default listUser;