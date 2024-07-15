// redux/store.jsx
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import { rootReducer } from './rootReducer';
import { apiSlice } from './api/apiSlice';

export const store = configureStore({
	reducer: {
		rootReducer,
		auth: authReducer,
		api: apiSlice.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
