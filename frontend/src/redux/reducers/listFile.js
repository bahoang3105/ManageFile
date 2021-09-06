import {
    DELETE_FILE,
    UPLOAD_FILE,
} from "../actionTypes";

const initialState = {
    files: null,
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case DELETE_FILE: {

        }
        case UPLOAD_FILE: {

        }
        default:
            return state;
    }
}

export default reducer;