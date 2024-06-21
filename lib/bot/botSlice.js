import { createSlice } from "@reduxjs/toolkit";

export const botSlice = createSlice({
  name: 'bot',
  initialState: {
    value: {
      scanResult: {
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
        no_matches_count: 0,
        status: 'available'
      },
      lastScanResult: {
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
        no_matches_count: 0,
        status: 'available'
      },
      extraReport: {
        user: {
          total: 0,
          weekly: 0
        },
        order: {
          total: 0,
          weekly: 0
        }
      }
    }
  },
  reducers: {
    setScanResult: (state, action) => {
      state.value.scanResult = {
        ...action.payload
      }
    },
    setLastScanResult: (state, action) => {
      state.value.lastScanResult = {
        ...action.payload
      }
    },
    setExtraReport: (state, action) => {
      state.value.extraReport = {
        ...action.payload
      }
    }
  }
});

export const { setScanResult, setLastScanResult, setExtraReport } = botSlice.actions;

export const scanResult = (state) => state.bot.value.scanResult;
export const lastScanResult = (state) => state.bot.value.lastScanResult;
export const extraReport = (state) => state.bot.value.extraReport;

export default botSlice.reducer;