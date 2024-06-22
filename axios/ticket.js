import axios from 'axios';
import { getAccessToken, getUserId } from './token';
import { ENDPOINT } from '@/config/config';

export const createNewTicket = async (data) => {

  const accessToken = await getAccessToken();
  const userId = getUserId();

  try {
    const res = await axios.post(`${ENDPOINT}/tickets/${userId}`, {
      ...data
    },
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

export const updateTickStatus = async (id, status) => {

  const accessToken = await getAccessToken();

  try {
    const res = await axios.patch(`${ENDPOINT}/tickets/${id}`, {
      status
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

export const getTickets = async () => {

  const accessToken = await getAccessToken();

  try {
    const res = await axios.get(`${ENDPOINT}/tickets`,
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

export const getTicketsByUser = async () => {

  const accessToken = await getAccessToken();
  const userId = getUserId();

  try {
    const res = await axios.get(`${ENDPOINT}/tickets-user/${userId}`,
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

export const getMessagesByTicket = async (id) => {

  const accessToken = await getAccessToken();

  try {
    const res = await axios.get(`${ENDPOINT}/tickets/${id}`,
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

export const sendMessage = async (data) => {

  const accessToken = await getAccessToken();

  try {
    const res = await axios.post(`${ENDPOINT}/tickets-message`, data,
      {
        headers: {
          'x-access-token': accessToken,
          'Content-Type': 'multipart/form-data',
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


export const addHelpCountsOnTicket = async (id, data) => {

  const accessToken = await getAccessToken();

  try {
    const res = await axios.post(`${ENDPOINT}/ticket-help-count/${id}`, data,
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

export const getCurrentTicketStatus = async () => {

  const accessToken = await getAccessToken();
  const userId = await getUserId();

  try {
    const res = await axios.get(`${ENDPOINT}/${userId}/current-ticket-status`,
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