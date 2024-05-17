import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    value: null
  },
  reducers: {
    setUserInfo: (state, action) => {
      if (!action.payload) state.value = null;
      else state.value = {
        email: action.payload.email || '',
        name: action.payload.name || '',
        avatar: action.payload.avatar || '',
        roles: action.payload.roles || [],
        verified: action.payload.verified || false,
        subscription: action.payload.subscription || false,
        social: action.payload.social || ''
      }
    }
  }
});

export const { setUserInfo } = authSlice.actions;

export const userInfo = (state) => state.user.value;

export default authSlice.reducer;