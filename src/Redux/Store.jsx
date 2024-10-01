import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../Redux/Reducer';

const store = configureStore({
  reducer: {
    users: dataReducer, // Ensure 'users' matches the slice name
  },
});

export default store;
