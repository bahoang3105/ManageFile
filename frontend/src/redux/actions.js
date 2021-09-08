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
    return async (dispatch) => {
        try {
            const files = await axios.get('http://localhost:6000/admin/all', {
                headers: {
                    'x-access-token': token,
                }
            });
            dispatch({
                type: GET_FILES,
                payload: files.data,
            });
        } catch(err) {
            console.log(err.response);
        };
    };
};

export const getUsers = token => {
    return async (dispatch) => {
        try {
            const users = await axios.get('http://localhost:6000/admin/user', {
                headers: {
                    'x-access-token': token,
                }
            });
            dispatch({
                type: GET_USERS,
                payload: users.data,
            });
        } catch(err) {
            console.log(err.response);
        }
    };
}

export const deleteFile = (id, token) => {
    return async (dispatch) =>  {
        try {
            await axios.delete('http://localhost:6000/file/deleteFile', {
                headers: {
                    'x-access-token': token,
                },
                data: {
                    fileID: id,
                }
            });
            dispatch({
                type: DELETE_FILE,
                payload: id,
            });
        } catch(err) {
            console.log(err.response);
        }
    }
};

export const deleteUser = (id, token) => {
    console.log('da chay toi action');
    return async (dispatch) =>  {
        try {
            await axios.delete('http://localhost:6000/admin/user/delete', {
                headers: {
                    'x-access-token': token,
                },
                data: {
                    userID: id,
                }
            });
            dispatch({
                type: DELETE_USER,
                payload: id,
            });
        } catch(err) {
            console.log(err.response);
        }
    }
};

export const upgradeToAdmin = (id, token) => {
    console.log('ffdsfsdf')
    return async (dispatch) =>  {
        try {
            await axios.post('http://localhost:6000/admin/user/upgrade', { userID: id }, {
                headers: {
                    'x-access-token': token,
                }
            });
            dispatch({
                type: UPGRADE_TO_ADMIN,
                payload: id,
            });
        } catch(err) {
            console.log(err.response);
        }
    }
};

export const resetPassUser = (id, token) => {
    return async (dispatch) =>  {
        try {
            await axios.post('http://localhost:6000/admin/user/resetPassword', { userID: id }, {
                headers: {
                    'x-access-token': token,
                }
            });
            dispatch({
                type: RESET_PASS_USER,
            })
        } catch(err) {
            console.log(err.response);
        }
    }
};

export const uploadFile = (file, token) => {
    return async (dispatch) =>  {
        try {
            const newFile = await axios.post('http://localhost:6000/file/uploadFile', file, {
                headers: {
                    'x-access-token': token,
                }
            });
            dispatch({
                type: UPLOAD_FILE,
                payload: newFile.data.newFile,
            });
        } catch(err) {
            console.log(err.response);
        }
    }
};

