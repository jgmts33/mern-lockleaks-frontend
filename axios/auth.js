import { ENDPOINT } from '@/config/config';
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
      data: err.response?.data?.message
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
      data: err.response?.data?.message
    }
  }

}

export const googleAuth = async (code) => {
  try {
    const res = await axios.post(`${ENDPOINT}/auth/google`, { code });

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

export const facebookAuth = async (code) => {
  try {
    const res = await axios.post(`${ENDPOINT}/auth/facebook`, { code });

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

export const twitterAuth = async (code) => {
  try {
    const res = await axios.post(`${ENDPOINT}/auth/twitter`, { code });

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

export const forgotPassword = async (email) => {
  try {

    const res = await axios.post(`${ENDPOINT}/auth/forgot-password`, { email });

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


export const resetPassword = async (token, password) => {
  try {

    const res = await axios.post(`${ENDPOINT}/auth/reset-password`, {
      token: token,
      password: password,
    });

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