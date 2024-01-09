import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userinfo: {
    email: null,
    token: "",
    loading: false,
    error: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoginStart: state => {
      state.userinfo.loading = true;
      state.userinfo.error = null;
    },
    userLoginSuccess: (state, action) => {
      const { email, token } = action.payload;
      state.userinfo = {
        email,
        token,
        loading: false,
        error: null,
      };
    },
    userLoginFailure: (state, action) => {
      state.userinfo.error = action.payload;
      state.userinfo.loading = false;
    },
    userLogout: state => {
      state.userinfo = {
        email: null,
        token: "",
        loading: false,
        error: null,
      };
    },
  },
});

export const {
  userLoginStart,
  userLoginSuccess,
  userLoginFailure,
  userLogout,
} = userSlice.actions;
export default userSlice.reducer;
