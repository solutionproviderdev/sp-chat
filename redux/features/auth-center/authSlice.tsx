// // src/features/auth/authSlice.js
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   user: null,
//   isAuthenticated: false,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     userLoggedIn: (state, action) => {
//       state.user = action.payload.user;
//       state.isAuthenticated = true;
//       AsyncStorage.setItem('token', action.payload.token);
//     },
//     userLoggedOut: (state) => {
//       state.user = null;
//       state.isAuthenticated = false;
//       AsyncStorage.removeItem('token');
//     },
//   },
// });

// export const { userLoggedIn, userLoggedOut } = authSlice.actions;
// export default authSlice.reducer;


import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      AsyncStorage.setItem('token', action.payload.token);
    },
    userLoggedOut: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      AsyncStorage.removeItem('token');
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;