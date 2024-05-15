import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import bothReducer from './bot/botSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: authReducer,
      bot: bothReducer
    }
  })
}