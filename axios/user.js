import axios from 'axios';
import { getAccessToken, getUserId } from './token';
import { ENDPOINT } from '@/config/config';

export const getUsersListInfo = async (page) => {

  const accessToken = await getAccessToken();

  try {
    const res = await axios.get(`${ENDPOINT}/users?page=${page}`, {
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

export const updateUserInfo = async (id, data) => {

  const accessToken = await getAccessToken();

  try {
    const res = await axios.patch(`${ENDPOINT}/user/${id}`, {
      ...data
    }, {
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

export const updateUserVisible = async (id, ban) => {

  const accessToken = await getAccessToken();

  try {
    const res = await axios.patch(`${ENDPOINT}/user-visible/${id}`, {
      ban
    }, {
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

export const getUserInfo = async (id) => {

  const accessToken = await getAccessToken();

  try {
    const res = await axios.get(`${ENDPOINT}/users/${id}`, {
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

export const getUsernames = async (id) => {

  const accessToken = await getAccessToken();

  try {
    const res = await axios.get(`${ENDPOINT}/usernames/${id}`, {
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

export const deleteUser = async (id) => {

  const accessToken = await getAccessToken();

  try {
    const res = await axios.delete(`${ENDPOINT}/user/${id}`, {
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