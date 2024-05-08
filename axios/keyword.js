import { ENDPOINT } from '@/config/config';
import axios from 'axios';

export const addNewKeyword = async (data) => {
  try {
    const res = await axios.post(`${ENDPOINT}/keywords`, data);

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
