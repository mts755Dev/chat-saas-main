import { createSlice } from "@reduxjs/toolkit";
import { setCookie, getCookie } from "cookies-next";

const initialState = {
  isGoogleAuth: false,
  userInfo: getCookie("userInfo")
    ? JSON.parse(getCookie("userInfo") as string)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      // localStorage.setItem('userInfo', JSON.stringify(action.payload));
      setCookie("isAuth", true);
      setCookie("userInfo", action.payload);
    },
    logout: (state, action) => {
      state.userInfo = null;
      state.isGoogleAuth = false;

      // localStorage.removeItem('userInfo');
      setCookie("isAuth", false);
      setCookie("userInfo", null);
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
