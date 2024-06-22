import { ENDPOINT } from '@/config/config';
import axios from 'axios';
import { getAccessToken, getUserId } from './token';

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

    const response = await fetch('https://api.ipify.org?format=json');
    const region = await response.json();

    const res = await axios.post(`${ENDPOINT}/auth/signup`, {
      ...data,
      ip: region.ip
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

    const response = await fetch('https://api.ipify.org?format=json');
    const region = await response.json();

    const res = await axios.post(`${ENDPOINT}/auth/google`, {
      code,
      ip: region.ip
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

export const facebookAuth = async (code) => {
  try {

    const response = await fetch('https://api.ipify.org?format=json');
    const region = await response.json();

    const res = await axios.post(`${ENDPOINT}/auth/facebook`, {
      code,
      ip: region.ip
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

export const twitterAuth = async (code) => {

  const response = await fetch('https://api.ipify.org?format=json');
  const region = await response.json();

  try {
    const res = await axios.post(`${ENDPOINT}/auth/twitter`, {
      code,
      ip: region.ip
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
      data: res.data?.message || ""
    }

  } catch (err) {
    return {
      status: 'fail',
      data: err.response?.data?.message
    }
  }
}

export const sendVerificationEmail = async (email) => {

  const userId = await getUserId();
  try {

    const res = await axios.post(`${ENDPOINT}/auth/send-verification-email`, { email, id: userId });

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

export const getUserInfo = async (id = null) => {

  const userId = getUserId(); 

  try {

    const res = await axios.get(`${ENDPOINT}/users/${id ? id : userId}`, {
      headers: {
        'x-access-token': await getAccessToken()
      }
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