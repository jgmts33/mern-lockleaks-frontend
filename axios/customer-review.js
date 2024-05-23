import axios from 'axios';
import { getAccessToken, getUserId } from './token';
import { ENDPOINT } from '@/config/config';
export const createNewCustomerReview = async (data) => {

  const accessToken = await getAccessToken();

  try {
    const res = await axios.post(`${ENDPOINT}/customer-reviews/new`, data,
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

export const updateNewCustomerReview = async (id, data) => {

  const accessToken = await getAccessToken();

  try {
    const res = await axios.patch(`${ENDPOINT}/customer-reviews/${id}`, data,
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

export const getCustomerReviews = async () => {

  try {
    const res = await axios.get(`${ENDPOINT}/customer-reviews`);

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

export const getCustomerReviewDetails = async (id) => {

  const accessToken = await getAccessToken();

  try {
    const res = await axios.get(`${ENDPOINT}/customer-reviews/${id}`,
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

export const deleteCustomerReview = async (id) => {

  const accessToken = await getAccessToken();

  try {
    const res = await axios.delete(`${ENDPOINT}/customer-reviews/${id}`,
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