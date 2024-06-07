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
        id: action.payload.id || '',
        email: action.payload.email || '',
        name: action.payload.name || '',
        avatar: action.payload.avatar || '',
        roles: action.payload.roles || [],
        verified: action.payload.verified || false,
        subscription: action.payload.subscription || {
          payment_method: null,
          expire_date: null,
          status: '',
          plan_id: null,
          features: {}
        },
        social: action.payload.social || '',
        contract: action.payload.contract || {
          status: "",
          pdf_path: ""
        },
        copyright_holder: action.payload.copyright_holder || ''
      }
    }
  }
});

export const { setUserInfo } = authSlice.actions;

export const userInfo = (state) => state.user.value;

export default authSlice.reducer;