import { createSlice } from "@reduxjs/toolkit";

export const botSlice = createSlice({
  name: 'bot',
  initialState: {
    value: {
      scanProgress: 0,
      total_google_links: 0,
      total_google_images: 0,
      total_google_videos: 0,
      total_bing_links: 0,
      total_bing_images: 0,
      total_bing_videos: 0,
      good_count: 0,
      other_count: 0,
      bad_count: 0,
      new_count: 0,
      report_count: 0,
      no_report_count: 0,
      matches_count: 0,
      no_matches_count: 0
    }
  },
  reducers: {
    setScanProgress: (state, action) => {
      state.value.scanProgress = action.payload || 0
    },
    setScanResult: (state, action) => {
      state.value = {
        ...action.payload,
        scanProgress: 100
      }
    }
  }
});

export const { setScanProgress, setScanResult } = botSlice.actions;

export const scanProgress = (state) => state.bot.value.scanProgress;
export const scanResult = (state) => state.bot.value;

export default botSlice.reducer;