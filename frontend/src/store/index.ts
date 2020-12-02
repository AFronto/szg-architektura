import {
  combineReducers,
  getDefaultMiddleware,
  configureStore,
} from "@reduxjs/toolkit";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import jwt from "./Auth";
import history from "./applcationHistory";
import errors from "./Errors";

const rootReducer = combineReducers({
  router: connectRouter(history),
  jwt: jwt,
  errors: errors,
});

const middleware = [
  ...getDefaultMiddleware(),
  thunk,
  routerMiddleware(history),
];

export const store = configureStore({
  reducer: rootReducer,
  middleware,
});

export type AppDispatch = typeof store.dispatch;

export type ReduxState = ReturnType<typeof store.getState>;
