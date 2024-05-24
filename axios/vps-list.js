import axios from 'axios';
import { getAccessToken } from './token';
import { ENDPOINT } from '@/config/config';

export const createNewVps = async (data) => {

  const accessToken = await getAccessToken();

  try {
    const res = await axios.post(`${ENDPOINT}/vps-list/new`, data,
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

export const updateVps = async (id, data) => {

  const accessToken = await getAccessToken();

  try {
    const res = await axios.patch(`${ENDPOINT}/vps-list/${id}`, data,
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

export const getVpsList = async () => {

  const accessToken = await getAccessToken();

  try {
    const res = await axios.get(`${ENDPOINT}/vps-list`,
      {
        headers: {
          'x-access-token': accessToken
        }
      }
    );

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

export const getVpsDetails = async (id) => {

  const accessToken = await getAccessToken();

  try {
    const res = await axios.get(`${ENDPOINT}/vps-list/${id}`,
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

export const deleteVps = async (id) => {

  const accessToken = await getAccessToken();

  try {
    const res = await axios.delete(`${ENDPOINT}/vps-list/${id}`,
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

export const checkStatus = async (ip_address) => {

  const accessToken = await getAccessToken();

  try {
    const res = await axios.post(`${ENDPOINT}/vps-status`, {
      ip_address
    },
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