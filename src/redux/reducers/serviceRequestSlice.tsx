import { createSlice } from '@reduxjs/toolkit';
import { fetchServiceRequests } from '../actions/service_request';

const initialState = {
  loading: false,
  service_request: null,
  error: null,
  success: false,
};

const serviceRequestSlice = createSlice({
  name: 'service_request',
  initialState,
  reducers: {},
  extraReducers: {
    // Fetch Service Requests
    [fetchServiceRequests.pending.toString()]: (state: any) => {
      state.loading = true;
      state.error = null;
    },
    [fetchServiceRequests.fulfilled.toString()]: (
      state: any,
      { payload }: any,
    ) => {
      state.loading = false;
      state.success = true;
      state.service_request = payload;
    },
    [fetchServiceRequests.rejected.toString()]: (
      state: any,
      { payload }: any,
    ) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default serviceRequestSlice.reducer;
