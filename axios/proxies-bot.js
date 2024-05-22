import axios from 'axios';
import { getAccessToken, getUserId } from './token';
import { ENDPOINT } from '@/config/config';

export const createNewProxiesBot = async (data) => {

  const accessToken = await getAccessToken();

  try {
    const res = await axios.post(`${ENDPOINT}/proxies-bots`, data,
      {
        headers: {
          'x-access-token': accessToken,
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

export const updateProxiesBot = async (id, data) => {

  const accessToken = await getAccessToken();

  try {
    const res = await axios.patch(`${ENDPOINT}/proxies-bots/${id}`, data,
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

export const getProxiesBots = async () => {

  const accessToken = await getAccessToken();

  try {
    const res = await axios.get(`${ENDPOINT}/proxies-bots`, {
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

export const deleteProxiesBot = async (id) => {

  const accessToken = await getAccessToken();

  try {
    const res = await axios.delete(`${ENDPOINT}/proxies-bots/${id}`,
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