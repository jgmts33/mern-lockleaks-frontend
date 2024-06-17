import { ENDPOINT } from '@/config/config';
import axios from 'axios';
import { getAccessToken } from './token';

export const getHelpCategories = async () => {

  try {
    const res = await axios.get(`${ENDPOINT}/help/categories`);

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

export const getHelpAriticles = async () => {
  const accessToken = await getAccessToken();
  try {
    const res = await axios.get(`${ENDPOINT}/help/articles`, {
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

export const searchHelpAriticles = async (value) => {
  const accessToken = await getAccessToken();
  try {
    const res = await axios.get(`${ENDPOINT}/help/search-articles?search=${value}`, {
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

export const getHelpArticleByCategory = async (categoryId) => {

  try {
    const res = await axios.get(`${ENDPOINT}/help/articles?categoryId=${categoryId}`);

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

export const getHelpArticle = async (id) => {

  try {
    const res = await axios.get(`${ENDPOINT}/help/articles/${id}`);
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

export const addNewArticle = async (data) => {
  const accessToken = await getAccessToken();

  try {
    const res = await axios.post(`${ENDPOINT}/help/articles`, data, {
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

export const updateHelpArticle = async (id, data) => {
  const accessToken = await getAccessToken();

  try {
    const res = await axios.patch(`${ENDPOINT}/help/articles/${id}`, data, {
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

export const reactToArticle = async (id, data) => {
  const accessToken = await getAccessToken();

  try {
    const res = await axios.post(`${ENDPOINT}/help/articles/${id}`, data, {
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


export const deleteHelpArticle = async (id) => {
  const accessToken = await getAccessToken();
  try {
    const res = await axios.delete(`${ENDPOINT}/help/articles/${id}`, {
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

export const addNewCategory = async (data) => {
  const accessToken = await getAccessToken();
  try {
    const res = await axios.post(`${ENDPOINT}/help/categories`, data, {
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

export const updateCategory = async (id, data) => {
  const accessToken = await getAccessToken();

  try {
    const res = await axios.patch(`${ENDPOINT}/help/categories/${id}`, data, {
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

export const deleteCategory = async (id) => {
  const accessToken = await getAccessToken();

  try {
    const res = await axios.delete(`${ENDPOINT}/help/categories/${id}`, {
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