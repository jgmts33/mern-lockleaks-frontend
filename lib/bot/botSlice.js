import { createSlice } from "@reduxjs/toolkit";

export const botSlice = createSlice({
  name: 'bot',
  initialState: {
    value: 0
  },
  reducers: {
    setScan: (state, action) => {
      state.value = action.payload || 0
    }
  }
});

export const { setScan } = botSlice.actions;

export const scanProgress = (state) => state.bot.value;

export default botSlice.reducer;