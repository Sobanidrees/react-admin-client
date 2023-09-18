import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './reducers/adminSlice';
import serviceRequestReducer from './reducers/serviceRequestSlice';

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    service_request: serviceRequestReducer,
  },
});
