import { ENDPOINT } from '@/config/config.js';
import axios from 'axios';

export const login = async (data) => {
  try {
    const res = await axios.post(`${ENDPOINT}/auth/signin`, data);

    return {
      status: 'success',
      data: res.data
    }

  } catch (err) {
    return {
      status: 'fail',
      data: err.response?.data?.message
    }
  }
}

export const register = async (data) => {
  try {
    const res = await axios.post(`${ENDPOINT}/auth/signup`, data);

    return {
      status: 'success',
      data: res.data
    }

  } catch (err) {
    return {
      status: 'fail',
      data: err.response.data.message
    }
  }
}

export const verifyEmail = async (token) => {
  
  try {
    const res = await axios.post(`${ENDPOINT}/auth/verify-email`, { token });

    return {
      status: 'success',
      data: res.data
    }

  } catch (err) {
    return {
      status: 'fail',
      data: err.response.data.message
    }
  }
  
}