import { createAsyncThunk } from '@reduxjs/toolkit';
import {login, logout, getUsers} from '../../api/services/users';
import {registration} from '../../api/services/users';


export const loginAction = createAsyncThunk('user/login', (params) => {
    return login(params);
});
export const registrationAction = createAsyncThunk('user/registration', (params) => {
    return registration(params);
});

export const logoutAction = createAsyncThunk('user/logout', () => {
    return logout();
});

export const getUsersAction = createAsyncThunk('user/get',()=>{
    return getUsers();
})