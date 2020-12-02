import axios from "axios";
import LoginData from "../../data/server/Auth/LoginData";
import RegisterData from "../../data/server/Auth/RegisterData";
import { AppDispatch } from "../../store";
import { removeAuthData } from "../../store/Auth";
import { push } from "connected-react-router";
import { serverBaseUrl } from "../serverUrl";

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
    return axios.post(serverBaseUrl + "login", loginData).then();
  };
}

export function createNewAccount(registerData: RegisterData) {
  console.log(registerData);
  return (dispatch: AppDispatch) => {
    return axios.post(serverBaseUrl + "register", registerData).then();
  };
}
