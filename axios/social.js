import axios from 'axios';
import { getAccessToken, getUserId } from './token';
import { ENDPOINT } from '@/config/config';

export const socialProfileSubmit = async (links) => {

  const accessToken = await getAccessToken();
  const userId = getUserId();

  try {
    const res = await axios.post(`${ENDPOINT}/social-media-profiles/${userId}`,
      {
        links
      }
      ,
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

export const acceptSocialProfiles = async (name) => {

  const accessToken = await getAccessToken();

  try {
    const res = await axios.get(`${ENDPOINT}/social-media-profiles/download`, {
      headers: {
        'x-access-token': accessToken
      },
      params: {
        file_name: name
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


export const acceptSocialScanner = async (name) => {

  const accessToken = await getAccessToken();

  try {
    const res = await axios.get(`${ENDPOINT}/social-download-file?file=${name}`, {
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


export const getSocialProfileSubmitions = async () => {
  const accessToken = await getAccessToken();

  try {
    const res = await axios.get(`${ENDPOINT}/social-media-profiles`, {
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


export const getDailySubmitionCount = async () => {
  const accessToken = await getAccessToken();
  const userId = getUserId();

  try {
    const res = await axios.get(`${ENDPOINT}/social-media-profiles/count/${userId}`, {
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

export const getSocialScanResult = async () => {
  const accessToken = await getAccessToken();

  try {
    const res = await axios.get(`${ENDPOINT}/social-result`, {
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

export const getSocialScanResultsList = async () => {
  const accessToken = await getAccessToken();

  try {
    const res = await axios.get(`${ENDPOINT}/social-scan-result-list`, {
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

export const getSocialScanResultByUser = async () => {
  const accessToken = await getAccessToken();
  const userId = getUserId();

  try {
    const res = await axios.get(`${ENDPOINT}/${userId}/social-result`, {
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

export const getCurrentSocialScannerStatus = async () => {

  const accessToken = await getAccessToken();
  const userId = await getUserId();

  try {
    const res = await axios.get(`${ENDPOINT}/${userId}/current-social-scanner-status`, {
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