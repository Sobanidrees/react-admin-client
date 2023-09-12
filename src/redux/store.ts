import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './reducers/AdminSlice';
import serviceRequestReducer from './reducers/ServiceRequestSlice';

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    service_request: serviceRequestReducer,
  },
});
