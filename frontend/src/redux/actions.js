import axios from "axios";
import {
    DELETE_FILE,
    DELETE_USER,
    UPGRADE_TO_ADMIN,
    RESET_PASS_USER,
    UPLOAD_FILE,
    GET_FILES,
    GET_USERS,
} from "./actionTypes";


export const getFiles = token => {
    console.log('dsad')
    return async (dispatch, getState) => {
        const files = await axios.get('http://localhost:6000/file', {
            headers: {
                'x-access-token': token,
            }
        });
        console.log(files);
        dispatch({
            type: GET_FILES,
            payload: files.data,
        });
    };
};

export const getUsers = token => {
    return async (dispatch, getState) => {
        const users = await axios.get('http://localhost:6000/admin/user', {
            headers: {
                'x-access-token': token,
            }
        });
        console.log(users);
        dispatch({
            type: GET_USERS,
            payload: users.data,
        });
    };
}

export const deleteFile = id => ({
    type: DELETE_FILE,
    payload: {
        id,
    }
});

