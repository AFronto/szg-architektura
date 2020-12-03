import axios from "axios";
import LoginData from "../../data/server/Auth/LoginData";
import RegisterData from "../../data/server/Auth/RegisterData";
import { AppDispatch, ReduxState } from "../../store";
import { loadAuthData, removeAuthData } from "../../store/Auth";
import { push } from "connected-react-router";
import { serverBaseUrl } from "../serverUrl";
import { addError } from "../../store/Errors";
import { generateAuthenticationHeadder } from "../Helpers/HeaderHelper";

var refreshInterval: { id: NodeJS.Timeout; isSet: boolean } = {
  id: setInterval(() => {}, 1000),
  isSet: false,
};

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
        dispatch(loadAuthData({ auth: success.data }));
      }
    },
    (error) => {
      dispatch(
        addError({
          name: "refreshError",
          description: error.response.data,
        })
      );
      if (error.response.status === 401) {
        logOutLocally(dispatch);
      }
    }
  );
}

export function isLoggedIn(): boolean {
  const jwtToken = localStorage.getItem("jwtToken");
  return jwtToken !== undefined && jwtToken !== null;
}

export function logOutLocally(dispatch: AppDispatch) {
  clearInterval(refreshInterval.id);
  refreshInterval.isSet = false;
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

export function registerForRefreshingTokens() {
  return (dispatch: AppDispatch, getState: () => ReduxState) => {
    if (refreshInterval.isSet === false) {
      refreshInterval.isSet = true;
      refreshToken(dispatch, getState);
      refreshInterval.id = setInterval(() => {
        refreshToken(dispatch, getState);
      }, 5000);
    }
  };
}

export function logIn(loginData: LoginData) {
  return (dispatch: AppDispatch, getState: () => ReduxState) => {
    return axios.post(serverBaseUrl + "login", loginData).then(
      (success) => {
        dispatch(loadAuthData({ auth: success.data }));
        dispatch(push("/topics"));
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
        dispatch(loadAuthData({ auth: success.data }));
        dispatch(push("/topics"));
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
