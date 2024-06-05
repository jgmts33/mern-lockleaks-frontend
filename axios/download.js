import axios from 'axios';
import { getAccessToken, getUserId } from './token';
import { ENDPOINT } from '@/config/config';

export const getScrapedDataList = async (isAdmin = false, only = "", lastOne = false) => {

  const accessToken = await getAccessToken();
  const userId = getUserId();

  try {
    let URL = `${ENDPOINT}/${userId}/scraped-data`;
    if (isAdmin) URL = `${ENDPOINT}/scraped-data`;
    URL += `?only=${only}`;
    if (lastOne) URL += `&lastOne=true`;

    const res = await axios.get(URL, {
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

export const downloadSrapedData = async (folder_name, isAdmin = false) => {

  const accessToken = await getAccessToken();
  const userId = getUserId();

  try {
    const res = await axios.get(`${ENDPOINT}/${userId}/download-file?folder_name=${folder_name}&admin=${isAdmin}`, {
      headers: {
        'x-access-token': accessToken,
      },
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

export const acceptOrder = async (folder_name) => {

  const accessToken = await getAccessToken();

  try {
    const res = await axios.get(`${ENDPOINT}/accept-order?folder_name=${folder_name}`, {
      headers: {
        'x-access-token': accessToken,
      },
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