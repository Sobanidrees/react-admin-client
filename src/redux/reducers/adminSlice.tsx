import { createSlice } from '@reduxjs/toolkit';
import { adminLogin, adminLogout } from '../actions/admin';

const initialState = {
  loading: false,
  admin: null,
  jwtToken: null,
  error: null,
  success: false,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: {
    // login admin
    [adminLogin.pending.toString()]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [adminLogin.fulfilled.toString()]: (state, { payload }) => {
      state.loading = false;
      state.admin = payload;
    },
    [adminLogin.rejected.toString()]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // logout admin
    [adminLogout.pending.toString()]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [adminLogout.fulfilled.toString()]: (state) => {
      state.loading = false;
      state.admin = null;
      state.jwtToken = null;
    },
    [adminLogout.rejected.toString()]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default adminSlice.reducer;
