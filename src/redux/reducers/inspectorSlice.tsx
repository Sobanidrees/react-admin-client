import { createSlice } from '@reduxjs/toolkit';
import { fetchInspectors } from '../actions/inspectors';

const initialState = {
  loading: false,
  inspectors: null,
  error: null,
  success: false,
};

const inspectorSlice = createSlice({
  name: 'inspectors',
  initialState,
  reducers: {},
  extraReducers: {
    // Fetch Inspectors
    [fetchInspectors.pending.toString()]: (state: any) => {
      state.loading = true;
      state.error = null;
    },
    [fetchInspectors.fulfilled.toString()]: (state: any, { payload }: any) => {
      state.loading = false;
      state.success = true;
      state.inspectors = payload;
    },
    [fetchInspectors.rejected.toString()]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default inspectorSlice.reducer;
