import axios from 'axios';
import { getAccessToken, getUserId } from './token';
import { ENDPOINT } from '@/config/config';

export const scan = async ({
  usernames,
  only = null
}) => {

  const accessToken = await getAccessToken();
  const userId = getUserId();

  try {
    const res = await axios.post(`${ENDPOINT}/${userId}/scrape`,
      {
        usernames,
        only
      }
      ,
      {
        headers: {
          'x-access-token': accessToken
        }
      });

    return {
      status: 'success',
      data: res.data
    }

  } catch (err) {
    return {
      status: 'fail',
      data: err.response?.data?.message || "something went wrong"
    }
  }
}

export const socialScan = async (username) => {

  const accessToken = await getAccessToken();
  const userId = getUserId();

  try {
    const res = await axios.post(`${ENDPOINT}/${userId}/scan-social`,
      {
        username
      }
      ,
      {
        headers: {
          'x-access-token': accessToken
        }
      });

    return {
      status: 'success',
      data: res.data
    }

  } catch (err) {
    return {
      status: 'fail',
      data: err.response?.data?.message || "something went wrong"
    }
  }
}

export const aiFaceScan = async (data) => {

  const accessToken = await getAccessToken();
  const userId = getUserId();

  try {
    const res = await axios.post(`${ENDPOINT}/${userId}/scan-ai-face`, data,
      {
        headers: {
          'x-access-token': accessToken,
          'Content-Type': 'multipart/form-data'
        }
      });

    return {
      status: 'success',
      data: res.data
    }

  } catch (err) {
    return {
      status: 'fail',
      data: err.response?.data?.message || "something went wrong"
    }
  }
}

export const rrPhotoScan = async (data) => {

  const accessToken = await getAccessToken();
  const userId = getUserId();

  try {
    const res = await axios.post(`${ENDPOINT}/${userId}/scan-rr-photo`, data,
      {
        headers: {
          'x-access-token': accessToken,
          'Content-Type': 'multipart/form-data'
        }
      });

    return {
      status: 'success',
      data: res.data
    }

  } catch (err) {
    return {
      status: 'fail',
      data: err.response?.data?.message || "something went wrong"
    }
  }
}

export const rrUserScan = async (data) => {

  const accessToken = await getAccessToken();
  const userId = getUserId();

  try {
    const res = await axios.post(`${ENDPOINT}/${userId}/scan-rr-user`, data,
      {
        headers: {
          'x-access-token': accessToken
        }
      });

    return {
      status: 'success',
      data: res.data
    }

  } catch (err) {
    return {
      status: 'fail',
      data: err.response?.data?.message || "something went wrong"
    }
  }
}