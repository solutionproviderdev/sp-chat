import { combineReducers } from "@reduxjs/toolkit";
import leadsReducer from "./features/lead-center/leadCenterSlice";
export const rootReducer = combineReducers({
  leads: leadsReducer,
});
