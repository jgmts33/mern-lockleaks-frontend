import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    value: {
      email: '',
      roles: []
    }
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.value.email = action.payload.email;
      state.value.roles = action.payload.roles;
    }
  }
});

export const { setUserInfo } = authSlice.actions;

export const userInfo = (state) => state.user.value;

export default authSlice.reducer;