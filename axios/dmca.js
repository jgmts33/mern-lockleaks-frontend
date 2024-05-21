import axios from 'axios';
import { getAccessToken, getUserId } from './token';
import { ENDPOINT } from '@/config/config';

export const uploadDmcaImage = async (data) => {

  const accessToken = await getAccessToken();

  try {
    const res = await axios.post(`${ENDPOINT}/dmca-images/upload`, data, {
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

export const deleteDmcaImage = async (id) => {

  const accessToken = await getAccessToken();

  try {
    const res = await axios.delete(`${ENDPOINT}/dmca-images/${id}`, {
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

export const updateDmcaImageOrder = async (id, order) => {

  const accessToken = await getAccessToken();

  try {
    const res = await axios.put(`${ENDPOINT}/dmca-images/${id}`, {
      newOrder: order
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

export const downloadDmcaImages = async (filename) => {

  try {
    const res = await axios.get(`${ENDPOINT}/dmca-images/download?filename=${filename}`, {
      responseType: 'blob'
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


export const getDmcaImages = async () => {

  try {
    const res = await axios.get(`${ENDPOINT}/dmca-images`);

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

export const getDmcaImagesPositions = async () => {

  try {
    const res = await axios.get(`${ENDPOINT}/dmca-images/order`);

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

export const updateDmcaImagesPositions = async (data) => {

  try {
    const res = await axios.patch(`${ENDPOINT}/dmca-images/order`, {
      data
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

