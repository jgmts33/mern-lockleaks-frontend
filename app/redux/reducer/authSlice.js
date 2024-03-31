import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        email: "",
        password: ""
    },
    reducers: {
        SET_USER: (state, action) => {
            state.email = action.payload.email;
            state.password = action.payload.password;
        }
    }
});

export const { SET_USER } = authSlice.actions;
export default authSlice.reducer;