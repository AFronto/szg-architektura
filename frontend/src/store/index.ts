import {
  combineReducers,
  getDefaultMiddleware,
  configureStore,
} from "@reduxjs/toolkit";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import auth from "./Auth";
import history from "./applicationHistory";
import errors from "./Errors";
import topics from "./Topic";

const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: auth,
  errors: errors,
  topics: topics,
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
