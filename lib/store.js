import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: authReducer
    }
  })
}