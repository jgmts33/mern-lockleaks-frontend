import axios from 'axios';
import { getAccessToken, getUserId } from './token';
import { ENDPOINT } from '@/config/config';

export const getUsersListInfo = async () => {

  const accessToken = await getAccessToken();

  try {
    const res = await axios.get(`${ENDPOINT}/users`, {
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

export const getExtraReport = async () => {

  const accessToken = await getAccessToken();

  try {
    const res = await axios.get(`${ENDPOINT}/extra-report`, {
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

export const updatePaymentStatus = async (data) => {

  const accessToken = await getAccessToken();
  const userId = getUserId();

  try {
    const res = await axios.patch(`${ENDPOINT}/subscription/${userId}`,
      data,
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

export const handleDeleteSubmition = async (data) => {

  try {
    const res = await axios.post(`${ENDPOINT}/report-delete-data`, data);

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