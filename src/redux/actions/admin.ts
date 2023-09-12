import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiCall } from '../../apis/Api';
import { AdminDto } from '../../models/Account';
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
  async (_: void, { rejectWithValue }) => {
    try {
      await localStorage.removeItem('jwtToken');
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
