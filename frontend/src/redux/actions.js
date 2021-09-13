import axios from "axios";
import {
    LOGOUT,
    DELETE_FILE,
    DELETE_USER,
    UPGRADE_TO_ADMIN,
    RESET_PASS_USER,
    UPLOAD_FILE,
    GET_FILES,
    GET_USERS,
} from "./actionTypes";
import { baseURL } from "src/config";

export const getFiles = (token, role) => {
    let link = '';
    if(role === 1) link = baseURL + 'admin/file';
    else link = baseURL + 'file';
    return async (dispatch) => {
        try {
            const files = await axios.get(link, {
                headers: {
                    'x-access-token': token,
                }
            });
            dispatch({
                type: GET_FILES,
                payload: files.data,
            });
        } catch(err) {
            alert(err.response.data.message);
            window.location.href = '/404';
        };
    };
};

export const getUsers = token => {
    return async (dispatch) => {
        try {
            const users = await axios.get(baseURL + 'admin/user', {
                headers: {
                    'x-access-token': token,
                }
            });
            dispatch({
                type: GET_USERS,
                payload: users.data,
            });
        } catch(err) {
            alert(err.response.data.message);
            window.location.href = '/404';
        }
    };
}

export const deleteFile = (id, token) => {
    return async (dispatch) =>  {
        try {
            await axios.delete(baseURL + 'file/deleteFile', {
                headers: {
                    'x-access-token': token,
                },
                data: {
                    fileID: id,
                }
            });
            dispatch({
                type: DELETE_FILE,
                payload: id
            });
        } catch(err) {
            console.log(err.response);
        }
    }
};

export const deleteUser = (id, token) => {
    return async (dispatch) =>  {
        try {
            await axios.delete(baseURL + 'admin/user/delete', {
                headers: {
                    'x-access-token': token,
                },
                data: {
                    userID: id,
                }
            });
            dispatch({
                type: DELETE_USER,
                payload: id
            });
        } catch(err) {
            console.log(err.response);
            window.location.href = '/404';
        }
    }
};

export const upgradeToAdmin = (id, token) => {
    return async (dispatch) =>  {
        try {
            await axios.post(baseURL + 'admin/user/upgrade', { userID: id }, {
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
            await axios.post(baseURL + 'admin/user/resetPassword', { userID: id }, {
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
            const newFile = await axios.post(baseURL + 'file/uploadFile', file, {
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

export const logout = () => ({
    type: LOGOUT
});

