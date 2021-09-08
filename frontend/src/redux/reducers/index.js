import { combineReducers } from "redux";
import listUser from './listUser';
import listFile from './listFile';

export default combineReducers({ listUser, listFile });