import axios from 'axios';
import { getAccessToken, getUserId } from './token';
import { ENDPOINT } from '@/config/config';

export const acceptAIFaceScanner = async (name) => {

  const accessToken = await getAccessToken();

  try {
    const res = await axios.get(`${ENDPOINT}/ai-face-download-file?file=${name}`, {
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

export const getAIFaceScanResult = async () => {
  const accessToken = await getAccessToken();

  try {
    const res = await axios.get(`${ENDPOINT}/ai-face-scan-result`, {
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

export const getAIFaceScanResultsList = async () => {
  const accessToken = await getAccessToken();

  try {
    const res = await axios.get(`${ENDPOINT}/ai-face-scan-result-list`, {
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

export const getAIFaceScanResultByUser = async () => {
  const accessToken = await getAccessToken();
  const userId = getUserId();

  try {
    const res = await axios.get(`${ENDPOINT}/${userId}/ai-face-scan-result`, {
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

export const getCurrentAIFaceScannerStatus = async () => {

  const accessToken = await getAccessToken();
  const userId = await getUserId();

  try {
    const res = await axios.get(`${ENDPOINT}/${userId}/current-ai-face-scanner-status`, {
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