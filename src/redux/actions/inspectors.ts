import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiCall } from '../../apis/api';
import { ActionTypes } from '../constants/ActionTypes';
import { InspectorAssignedSr } from '../../models/inspectors';

export const fetchInspectors = createAsyncThunk(
  ActionTypes.FETCH_INSPECTORS,
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiCall('api/v1/admin/allInspectors', 'get');
      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const inspectorAssignedSr = createAsyncThunk(
    ActionTypes.ASSIGNED_SERVICE_REQUESTS,
    async (params: InspectorAssignedSr, { rejectWithValue }) => {
      try {
        const data = await apiCall('api/v1/admin/inspectorAssignedServiceRequest', 'post', params);
        return data;
      } catch (error: any) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(error.message);
        }
      }
    },
  );
