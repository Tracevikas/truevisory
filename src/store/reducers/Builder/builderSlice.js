// dataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const builderResponseData = createAsyncThunk('builder/builderResponseData', async (payload) => {

  try {
    let response;
    if (typeof payload === 'number' || !payload) {
      response = await axios.get(`https://truevisory-feeder.el.r.appspot.com/api/builder${!payload ? '' : `?page=${payload}`}`);
    } else {
      response = await axios.get(`https://truevisory-feeder.el.r.appspot.com/api/builder?search=${payload}`);
    }
    return response.data;
  } catch (error) {
    throw Error(error.response.data.error); // Throw error if API call fails
  }
});

// export const addBuilder = createAsyncThunk('builder/addbuilder', async (values) => {
//   return fetch("https://truevisory-feeder.el.r.appspot.com/api/builder", {
//     method: "POST",
//     headers: { Accept: "application/json", "Content-Type": "application/json" },
//     body: JSON.stringify({ builderName: values.builderName })
//   }).then((response) => response.json())
// })

// actions/builderActions.js


export const sendDataToBuilder = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('https://truevisory-feeder.el.r.appspot.com/api/builder', { builderName: payload });
      // Dispatch success action if needed
      dispatch({ type: 'SEND_DATA_SUCCESS', payload: response.data });
    } catch (error) {
      // Dispatch failure action if needed
      dispatch({ type: 'SEND_DATA_FAILURE', error: error.message });
    }
  };
};

export const updateBuilder = (payload) => {
  return async (dispatch) => {
    try {
      const { builderId, builderName } = payload;
      const response = await axios.put(`https://truevisory-feeder.el.r.appspot.com/api/builder/${builderId}`, { builderName: builderName });
      // Dispatch success action if needed
      dispatch({ type: 'SEND_DATA_SUCCESS', payload: response.data });
    } catch (error) {
      // Dispatch failure action if needed
      dispatch({ type: 'SEND_DATA_FAILURE', error: error.message });
    }
  };
};




const builderSlice = createSlice({
  name: 'builder',
  initialState: {
    data: [],
    loading: false,
    error: null,
    // isSuccess: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(builderResponseData.pending, (state) => {
        state.loading = true;
      })
      .addCase(builderResponseData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(builderResponseData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    //add builder
    // builder.addCase(addBuilder.pending, state => {
    //   state.loading = true
    //   state.pending = ''
    // })
    // builder.addCase(addBuilder.fulfilled, (state, action) => {
    //   state.loading = false,
    //     state.data = []
    //   state.isSuccess = action.payload
    // })
    // builder.addCase(addBuilder.rejected, (state, action) => {
    //   state.loading = false
    //   state.data = []
    //   state.error = action.error.message
    // })
  },
});

export default builderSlice.reducer;
// export const { fetchData }=dataSlice.actions;
// export const { extraReducers } = projectSlice.actions;

