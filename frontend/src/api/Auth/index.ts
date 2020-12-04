import axios from "axios";
import LoginData from "../../data/server/Auth/LoginData";
import RegisterData from "../../data/server/Auth/RegisterData";
import { AppDispatch, ReduxState } from "../../store";
import { loadAuthData, removeAuthData } from "../../store/Auth";
import { push } from "connected-react-router";
import { serverBaseUrl } from "../serverUrl";
import { addError } from "../../store/Errors";
import { generateAuthenticationHeader } from "../Helpers/HeaderHelper";
import { loadUser } from "../../store/User";

var refreshInterval: { id: NodeJS.Timeout; isSet: boolean } = {
  id: setInterval(() => {}, 1000),
  isSet: false,
};

function refreshToken(dispatch: AppDispatch, getState: () => ReduxState) {
  const header = generateAuthenticationHeader(getState());
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
    const header = generateAuthenticationHeader(getState());

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

export function initializeScreen() {
  return (dispatch: AppDispatch, getState: () => ReduxState) => {
    const header = generateAuthenticationHeader(getState());

    return axios({
      method: "GET",
      url: serverBaseUrl + "user",
      headers: header,
    }).then(
      (success) => {
        dispatch(loadUser({ user: success.data }));
        if (refreshInterval.isSet === false) {
          refreshInterval.isSet = true;
          refreshToken(dispatch, getState);
          refreshInterval.id = setInterval(() => {
            refreshToken(dispatch, getState);
          }, 5000);
        }
      },
      (error) => {
        dispatch(
          addError({
            name: "Get user data Error",
            description: error.response.data,
          })
        );
        if (error.response.status === 401) {
          logOutLocally(dispatch);
        }
      }
    );
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
