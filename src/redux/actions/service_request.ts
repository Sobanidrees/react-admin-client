import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiCall } from "../../apis/api";
import { ActionTypes } from "../constants/ActionTypes"
import { Status, UpdateServiceRequestDto } from "../../models/service_requests";

export const fetchServiceRequests = createAsyncThunk(
  ActionTypes.FETCH_SERVICE_REQUESTS,
  async (status: Status, { rejectWithValue }) => {
    try {
      const data = await apiCall(`api/v1/admin/findAllSrsPending/${status}`, 'get');
      return data;
    } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message)
    } else {
        return rejectWithValue(error.message)
      }
    }
  }
);

export const updateServiceRequests = createAsyncThunk(
    ActionTypes.UPDATE_SERVICE_REQUESTS,
    async (params: UpdateServiceRequestDto, { rejectWithValue }) => {
      try {
        const data = await apiCall('api/v1/admin/updateServiceRequestByAdmin', 'patch', params);
        return data;
      } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
          return rejectWithValue(error.message)
        }
      }
    }
  );