import axios from 'axios';
import { getAccessToken, getUserId } from './token';
import { ENDPOINT } from '@/config/config';

export const acceptRRUserScanner = async (name) => {

  const accessToken = await getAccessToken();

  try {
    const res = await axios.get(`${ENDPOINT}/rr-user-download-file?file=${name}`, {
      headers: {
        'x-access-token': accessToken
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

export const getRRUserScanResult = async () => {
  const accessToken = await getAccessToken();

  try {
    const res = await axios.get(`${ENDPOINT}/rr-user-scan-result`, {
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

export const getRRUserScanResultsList = async () => {
  const accessToken = await getAccessToken();

  try {
    const res = await axios.get(`${ENDPOINT}/rr-user-scan-result-list`, {
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

export const getRRUserScanResultByUser = async () => {
  const accessToken = await getAccessToken();
  const userId = getUserId();

  try {
    const res = await axios.get(`${ENDPOINT}/${userId}/rr-user-scan-result`, {
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

export const getCurrentRRUserScannerStatus = async () => {

  const accessToken = await getAccessToken();
  const userId = await getUserId();

  try {
    const res = await axios.get(`${ENDPOINT}/${userId}/current-rr-user-scanner-status`, {
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