import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  });

export const store = configureStore({
    reducer: rootReducer,
  });
