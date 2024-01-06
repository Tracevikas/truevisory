import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const dashboardResponseData = createAsyncThunk('dashboard/dashboardResponseData', async (payload) => {
  try {
      const response = await axios.get(`http://truevisory-feeder.el.r.appspot.com/api/dashboard`);
    return response.data;
  } catch (error) {
    throw Error(error.response.data.error); // Throw error if API call fails
  }
});



const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
      data: [],
      loading: false,
      error: null,
      // isSuccess: ''
    },
    reducers: {},
    extraReducers: (dashboard) => {
      dashboard
        .addCase(dashboardResponseData.pending, (state) => {
          state.loading = true;
        })
        .addCase(dashboardResponseData.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
          state.error = null;
        })
        .addCase(dashboardResponseData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });
  
  export default dashboardSlice.reducer;

