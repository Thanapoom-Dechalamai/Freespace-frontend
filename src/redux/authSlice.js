import { createSlice } from '@reduxjs/toolkit';

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: {
        isLoginPage: true,
        isAuthenticated: false,
        accessToken: null,
        user: null
    },
    reducers: {
        setAccessToken: (state, action) =>
        {
            state.isAuthenticated = true;
            state.accessToken = action.payload;
            localStorage.setItem('accessToken', state.accessToken);
        },
        setUser: (state, action) =>
        {
            state.user = action.payload;
        },
        login: (state, action) =>
        {
            state.isAuthenticated = true;
            state.accessToken = action.payload;
        },
        logout: (state) =>
        {
            state.isAuthenticated = false;
            state.accessToken = null;
            state.user = null;
            localStorage.removeItem('accessToken');
        },
        setLoginPage: (state, action) =>
        {
            state.isLoginPage = action.payload;
        },
    },
});

export const { setLoginPage, setAccessToken, setUser, login, logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;