import { createSlice } from "@reduxjs/toolkit";
import AuthData from "../../data/server/Auth/AuthData";

const authSlice = createSlice({
  name: "auth",
  initialState: {} as AuthData,
  reducers: {
    loadAuthData(_state, action) {
      localStorage.setItem("jwtToken", action.payload.auth.token);
      localStorage.setItem(
        "jwtTokenExpirationTime",
        action.payload.auth.tokenExpirationTime
      );
      return action.payload.auth;
    },
    removeAuthData() {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("jwtTokenExpirationTime");
      return {} as AuthData;
    },
  },
});

export const { removeAuthData, loadAuthData } = authSlice.actions;
export default authSlice.reducer;
