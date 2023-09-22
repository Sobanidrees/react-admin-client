import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiCall } from '../../apis/api';
import { AdminDto } from '../../models/account';
import { ActionTypes } from '../constants/ActionTypes';
import jwt_decode from 'jwt-decode';

export const adminLogin = createAsyncThunk(
  ActionTypes.ADMIN_LOGIN,
  async (params: AdminDto, { rejectWithValue }) => {
    try {
      const token = await apiCall('api/v1/admin/login', 'post', params);
      localStorage.setItem('jwtToken', token);
      const admin = jwt_decode(token);
      localStorage.setItem('admin', JSON.stringify(admin));
      return token;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const adminLogout = createAsyncThunk(
  ActionTypes.ADMIN_LOGOUT,
  async (_, { rejectWithValue }) => {
    try {
      await apiCall('api/v1/auth/logout', 'post');
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('admin');
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
