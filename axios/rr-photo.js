import axios from 'axios';
import { getAccessToken, getUserId } from './token';
import { ENDPOINT } from '@/config/config';

export const acceptRRPhotoScanner = async (name) => {

  const accessToken = await getAccessToken();

  try {
    const res = await axios.get(`${ENDPOINT}/rr-photo-download-file?file=${name}`, {
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

export const getRRPhotoScanResult = async () => {
  const accessToken = await getAccessToken();

  try {
    const res = await axios.get(`${ENDPOINT}/rr-photo-scan-result`, {
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

export const getRRPhotoScanResultsList = async () => {
  const accessToken = await getAccessToken();

  try {
    const res = await axios.get(`${ENDPOINT}/rr-photo-scan-result-list`, {
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

export const getRRPhotoScanResultByUser = async () => {
  const accessToken = await getAccessToken();
  const userId = getUserId();

  try {
    const res = await axios.get(`${ENDPOINT}/${userId}/rr-photo-scan-result`, {
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

export const getCurrentRRPhotoScannerStatus = async () => {

  const accessToken = await getAccessToken();
  const userId = await getUserId();

  try {
    const res = await axios.get(`${ENDPOINT}/${userId}/current-rr-photo-scanner-status`, {
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