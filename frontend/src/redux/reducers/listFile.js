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
            const id = action.payload;
            let place;
            for(let i = 0; i < state.files.length; i++) {
                if(parseInt(id) === state.files[i].fileID) {
                    place = i;
                    break;
                }
            }
            return {
                ...state,
                files: [
                    ...state.files.slice(0, place),
                    ...state.files.slice(place+1)
                ]
            };
        }
        case UPLOAD_FILE: {
            const newFiles = action.payload;
            if(state.files === null) {
                return {
                    ...state,
                    files: [newFiles]
                };
            }
            return {
                ...state,
                files: [...state.files, newFiles]
            };
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