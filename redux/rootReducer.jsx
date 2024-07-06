// redux/rootReducer.jsx
import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import { apiSlice } from './apiSlice'; // Ensure this import

const rootReducer = combineReducers({
  counter: counterReducer,
  [apiSlice.reducerPath]: apiSlice.reducer, // Include the API slice reducer here
});

export default rootReducer;
