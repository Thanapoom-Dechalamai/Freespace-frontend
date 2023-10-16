import { configureStore } from '@reduxjs/toolkit';
import authenticationSlice from './authSlice';
import api from './apiSlice';

const store = configureStore({
    reducer: {
        authentication: authenticationSlice,
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

export default store;