import {createSlice} from '@reduxjs/toolkit';
import {loginAction, getUsersAction, registrationAction, logoutAction} from '../actions/users';

const initialState = {
    loginStatus: 'INITIAL',
    logoutStatus: 'INITIAL',
    registrationStatus: 'INITIAL',
    user: null,
    users: null,
    getUsersStatus:'initial',
    isAuthorized: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAction.pending, (state) => {
                state.loginStatus = 'FETCHING';
                state.error = null;
            })
            .addCase(loginAction.fulfilled, (state, { payload }) => {
                state.loginStatus = 'FETCHED';
                state.user = payload;
                state.isAuthorized = true;
                state.error = null;
            })
            .addCase(loginAction.rejected, (state, { error }) => {
                state.loginStatus = 'ERROR';
                state.isAuthorized = false;
                state.error = error;
            });
        builder
            .addCase(registrationAction.pending, (state) => {
                state.registrationStatus = 'FETCHING';
                state.error = null;
            })
            .addCase(registrationAction.fulfilled, (state) => {
                state.registrationStatus = 'FETCHED';
                state.error = null;
            })
            .addCase(registrationAction.rejected, (state, { error }) => {
                state.registrationStatus = 'ERROR';
                state.error = error;
            });
        builder
            .addCase(logoutAction.pending, (state) => {
                state.logoutStatus = 'FETCHING';
                state.error = null;
            })
            .addCase(logoutAction.fulfilled, (state) => {
                state.logoutStatus = 'FETCHED';
                state.isAuthorized = false;
                state.error = null;
            })
            .addCase(logoutAction.rejected, (state, { error }) => {
                state.logoutStatus = 'ERROR';
                state.error = error;
            });
        builder
            .addCase(getUsersAction.pending, (state) => {
                state.getUsersStatus = 'FETCHING';
                state.error = null;
            })
            .addCase(getUsersAction.fulfilled, (state, {payload}) => {
                state.getUsersStatus = 'FETCHED';
                state.users = payload;
                state.error = null;
            })
            .addCase(getUsersAction.rejected, (state, { error }) => {
                state.getUsersStatus = 'ERROR';
                state.error = error;
            });

    },
});

export const resetUserState = userSlice.actions.reset;
export const userReducer = userSlice.reducer;