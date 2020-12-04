import { createSlice } from "@reduxjs/toolkit";
import UserData from "../../data/server/User/UserData";

const userSlice = createSlice({
  name: "user",
  initialState: {} as UserData,
  reducers: {
    loadUser(_state, action) {
      return action.payload.user;
    },
  },
});

export const { loadUser } = userSlice.actions;

export default userSlice.reducer;
