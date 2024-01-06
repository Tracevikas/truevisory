// dataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// Fetch all data 
export const unitCategoryResponseData = createAsyncThunk('unitcategory/unitCategoryResponseData', async (payload) => {
  try {
    let response;
    if (typeof payload === 'number' || !payload) {
      response = await axios.get(`https://truevisory-feeder.el.r.appspot.com/api/unit-category${!payload ? '' : `?page=${payload}`}`);
    } else {
      response = await axios.get(`https://truevisory-feeder.el.r.appspot.com/api/unit-category?search=${payload}`);
    }
    return response.data;
  } catch (error) {
    throw Error(error.response.data.error); // Throw error if API call fails
  }
});

// Create a New UnitsCategory

export const sendDataToUnitCategory = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('https://truevisory-feeder.el.r.appspot.com/api/unit-category', payload);
      dispatch({ type: 'SEND_DATA_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'SEND_DATA_FAILURE', error: error.message });
    }
  };
};

export const updateUnitCategory = (payload) => {
  return async (dispatch) => {
    try {
      const body =
      {
        "unitCategoryName": payload.unitCategoryName,
        "propertyType": payload.propertyType,
        "areaMeasurementType": payload.areaMeasurementType,
        "otherAreaMeasurementType": payload.otherAreaMeasurementType,
        "remarks": payload.remarks

      }
      const response = await axios.put(`https://truevisory-feeder.el.r.appspot.com/api/unit-category/${payload.unitCategoryId}`, body);
      dispatch({ type: 'SEND_DATA_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'SEND_DATA_FAILURE', error: error.message });
    }
  };
};




const unitcategorySlice = createSlice({
  name: 'unitcategory',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(unitCategoryResponseData.pending, (state) => {
        state.loading = true;
      })
      .addCase(unitCategoryResponseData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(unitCategoryResponseData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default unitcategorySlice.reducer;
// export const { fetchData }=dataSlice.actions;
// export const { extraReducers } = projectSlice.actions;

