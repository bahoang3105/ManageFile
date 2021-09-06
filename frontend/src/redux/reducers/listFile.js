import {
    DELETE_FILE,
    UPLOAD_FILE,
    GET_FILES,
} from "../actionTypes";

const initialState = {
    files: null,
}

const listFile = (state = initialState, action) => {
    switch(action.type) {
        case DELETE_FILE: {

        }
        case UPLOAD_FILE: {

        }
        case GET_FILES: {
            return {
                ...state,
                files: action.payload.data
            }
        }
        default:
            return state;
    }
}

export default listFile;