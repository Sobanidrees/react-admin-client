import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiCall } from '../../apis/api';
import { AdminDto } from '../../models/account';
import { ActionTypes } from '../constants/action-types';
import jwt_decode from 'jwt-decode';

export const adminLogin = createAsyncThunk(
  ActionTypes.ADMIN_LOGIN,
  async (params: AdminDto, { rejectWithValue }) => {
    try {
      const token = await apiCall('api/v1/admin/login', 'post', params);
      // store admin's token in local storage
      localStorage.setItem('jwtToken', token);
      const admin = jwt_decode(token);
      localStorage.setItem('admin', JSON.stringify(admin));
      return token;
    } catch (error: any) {
      // return custom error message from API if any
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
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
