import axios from 'axios';
import { getAccessToken } from './token';
import { ENDPOINT } from '@/config/config';

export const scan = async (data) => {

  const accessToken = getAccessToken();

  try {
    const res = await axios.post(`${ENDPOINT}/scrape`, data, {
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
