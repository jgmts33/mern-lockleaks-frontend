import axios from 'axios';
import { getAccessToken, getUserId } from './token';
import { ENDPOINT } from '@/config/config';

export const createNewSocialUsername = async (data, id = null) => {

  const accessToken = await getAccessToken();
  const userId = getUserId();

  try {
    const res = await axios.post(`${ENDPOINT}/social-usernames/${id ? id : userId}`, data, {
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

export const updateSocialUsername = async (id, data) => {

  const accessToken = await getAccessToken();

  try {
    const res = await axios.patch(`${ENDPOINT}/social-usernames/${id}`, data, {
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

export const deleteSocialUsername = async (id) => {

  const accessToken = await getAccessToken();

  try {
    const res = await axios.delete(`${ENDPOINT}/social-usernames/${id}`, {
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

export const getSocialUsername = async (user_id = null) => {

  const userId = await getUserId();

  const accessToken = await getAccessToken();

  try {
    const res = await axios.get(`${ENDPOINT}/social-usernames/${user_id ? user_id : userId}`, {
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