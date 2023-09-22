import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './reducers/adminSlice';
import serviceRequestReducer from './reducers/serviceRequestSlice';
import inspectorReducer from './reducers/inspectorSlice';

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    service_request: serviceRequestReducer,
    inspectors: inspectorReducer,
  },
});
