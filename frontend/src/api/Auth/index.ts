import axios from "axios";
import LoginData from "../../data/server/Auth/LoginData";
import RegisterData from "../../data/server/Auth/RegisterData";
import { AppDispatch } from "../../store";
import { loadAuthData, removeAuthData } from "../../store/Auth";
import { push } from "connected-react-router";
import { serverBaseUrl } from "../serverUrl";
import { addError } from "../../store/Errors";

export function isLoggedIn(): boolean {
  const jwtToken = localStorage.getItem("jwtToken");
  return jwtToken !== undefined && jwtToken !== null;
}

export function logOut(dispatch: AppDispatch) {
  dispatch(removeAuthData());
  dispatch(push("/login"));
}

export function logIn(loginData: LoginData) {
  return (dispatch: AppDispatch) => {
    return axios.post(serverBaseUrl + "login", loginData).then(
      (success) => {
        dispatch(loadAuthData({ jwt: success.data }));
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
  return (dispatch: AppDispatch) => {
    return axios.post(serverBaseUrl + "register", registerData).then(
      (success) => {
        dispatch(loadAuthData({ jwt: success.data }));
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
