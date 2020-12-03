import axios from "axios";
import LoginData from "../../data/server/Auth/LoginData";
import RegisterData from "../../data/server/Auth/RegisterData";
import { AppDispatch, ReduxState } from "../../store";
import { loadAuthData, removeAuthData } from "../../store/Auth";
import { push } from "connected-react-router";
import { serverBaseUrl } from "../serverUrl";
import { addError } from "../../store/Errors";
import { generateAuthenticationHeadder } from "../Helpers/HeaderHelper";

var refreshInterval: NodeJS.Timeout;

function refreshToken(dispatch: AppDispatch, getState: () => ReduxState) {
  const header = generateAuthenticationHeadder(getState());
  return axios({
    method: "POST",
    url: serverBaseUrl + "token",
    headers: header,
  }).then(
    (success) => {
      if (
        success.data.logedOut !== undefined &&
        success.data.logedOut === true
      ) {
        logOutLocally(dispatch);
      } else {
        dispatch(loadAuthData({ jwt: success.data }));
      }
    },
    (error) =>
      dispatch(
        addError({
          name: "refreshError",
          description: error.response.data,
        })
      )
  );
}

export function isLoggedIn(): boolean {
  const jwtToken = localStorage.getItem("jwtToken");
  return jwtToken !== undefined && jwtToken !== null;
}

export function logOutLocally(dispatch: AppDispatch) {
  clearInterval(refreshInterval);
  dispatch(removeAuthData());
  dispatch(push("/login"));
}

export function logOut() {
  return (dispatch: AppDispatch, getState: () => ReduxState) => {
    const header = generateAuthenticationHeadder(getState());

    return axios({
      method: "POST",
      url: serverBaseUrl + "logout",
      headers: header,
    }).then(
      (_success) => {
        logOutLocally(dispatch);
      },
      (error) =>
        dispatch(
          addError({
            name: "credentialError",
            description: error.response.data,
          })
        )
    );
  };
}

export function logIn(loginData: LoginData) {
  return (dispatch: AppDispatch, getState: () => ReduxState) => {
    return axios.post(serverBaseUrl + "login", loginData).then(
      (success) => {
        dispatch(loadAuthData({ jwt: success.data }));
        dispatch(push("/topics"));
        refreshInterval = setInterval(() => {
          refreshToken(dispatch, getState);
        }, 5000);
      },
      (error) =>
        dispatch(
          addError({
            name: "credentialError",
            description: error.response.data,
          })
        )
    );
  };
}

export function createNewAccount(registerData: RegisterData) {
  console.log(registerData);
  return (dispatch: AppDispatch, getState: () => ReduxState) => {
    return axios.post(serverBaseUrl + "register", registerData).then(
      (success) => {
        dispatch(loadAuthData({ jwt: success.data }));
        dispatch(push("/topics"));
        refreshInterval = setInterval(() => {
          refreshToken(dispatch, getState);
        }, 5000);
      },
      (error) =>
        dispatch(
          addError({
            name: "registrationCredentialError",
            description: error.response.data,
          })
        )
    );
  };
}
