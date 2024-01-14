import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userinfo: {
    name: "",
    username: "",
    email: "",
    userId: "",
    role: "",
    token: null,
    loading: false,
    error: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoadingStart: state => {
      state.userinfo.loading = true;
      state.userinfo.error = null;
    },
    userLoadingStop: state => {
      state.userinfo.loading = false;
    },
    userLoginSuccess: (state, action) => {
      const { name, username, email, userId, role, token } = action.payload;
      state.userinfo = {
        name,
        username,
        email,
        userId,
        role,
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
        name: "",
        username: "",
        email: "",
        userId: "",
        role: "",
        token: null,
        loading: false,
        error: null,
      };
    },
  },
});

export const {
  userLoadingStart,
  userLoadingStop,
  userLoginSuccess,
  userLoginFailure,
  userLogout,
} = userSlice.actions;
export default userSlice.reducer;
