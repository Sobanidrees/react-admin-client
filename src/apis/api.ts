import axios from 'axios';

export const apiCall = async (
  url: string,
  method: any,
  data?: any,
  params?: any,
) => {
  const token = localStorage.getItem('jwtToken');
  const api = axios.create({
    baseURL: process.env.REACT_APP_NEST_BACKEND_API,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  try {
    const res = await api({ url, method, data, params });
    return res.data;
  } catch (error) {
    throw new Error('An error occurred during the API call.');
  }
};
