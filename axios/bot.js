import { BOT_ENDPOINT } from '@/config/config';
import axios from 'axios';

export const scan = async (data) => {
  try {
    const res = await axios.post(`${BOT_ENDPOINT}/scrape`, data);

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
