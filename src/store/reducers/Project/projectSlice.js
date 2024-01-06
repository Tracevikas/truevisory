// dataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const projectResponseData = createAsyncThunk('project/projectResponseData', async (payload) => {
  try {
    let response;
    if (!payload) {
      response = await axios.get(`https://truevisory-feeder.el.r.appspot.com/api/project`);
    } else if (typeof payload === 'number') {
      response = await axios.get(`https://truevisory-feeder.el.r.appspot.com/api/project${`?page=${payload}`}`);
    } else if (typeof payload === 'object') {
      response = await axios.get(`https://truevisory-feeder.el.r.appspot.com/api/project?builder=${payload.builder}`);
    } else {
      response = await axios.get(`https://truevisory-feeder.el.r.appspot.com/api/project?search=${payload}`);
    }
    return response.data;
  } catch (error) {
    throw Error(error.response.data.error); // Throw error if API call fails
  }

});

// Create a New Project

export const sendDataToProject = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('https://truevisory-feeder.el.r.appspot.com/api/project', payload);
      dispatch({ type: 'SEND_DATA_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'SEND_DATA_FAILURE', error: error.message });
    }
  };
};

export const updateProject = (payload) => {
  return async (dispatch) => {
    try {
      const body = {
        builder: payload.builderId,
        projectName: payload.projectName,
        paymentPlans: [payload.paymentPlanId],
        rc: payload.rc,
        ra: payload.ra,
        remarks: payload.remarks
      }
      const response = await axios.put(`https://truevisory-feeder.el.r.appspot.com/api/project/${payload.projectId}`, body);
      dispatch({ type: 'SEND_DATA_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'SEND_DATA_FAILURE', error: error.message });
    }
  };
};


const projectSlice = createSlice({
  name: 'project',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(projectResponseData.pending, (state) => {
        state.loading = true;
      })
      .addCase(projectResponseData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(projectResponseData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default projectSlice.reducer;
// export const { fetchData }=dataSlice.actions;
// export const { extraReducers } = projectSlice.actions;

