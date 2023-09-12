import axios from 'axios';

const token = localStorage.getItem('jwtToken');
const api = axios.create({
  baseURL: process.env.REACT_APP_NEST_BACKEND_API,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

export const apiCall = async (
  url: string,
  method: any,
  data?: any,
  params?: any,
) => {
  const res = await api({ url, method, data, params });
  return res.data;
};
