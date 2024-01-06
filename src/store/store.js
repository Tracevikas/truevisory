// store.js
import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './reducers/Project/projectSlice'; // Replace with your slice file

const store = configureStore({
  reducer: {
    data: dataReducer,
    // Add other reducers if any
  },
  // Other configurations if needed
});

export default store;
