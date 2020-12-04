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
import user from "./User";

const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: auth,
  errors: errors,
  topics: topics,
  user: user,
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
