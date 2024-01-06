// dataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// This api for Used for Fecth all Data 

export const propertyResponseData = createAsyncThunk('property/propertyResponseData', async (payload) => {
    try {
        let response;
        if (typeof payload === 'number' || !payload) {
            response = await axios.get(`https://truevisory-feeder.el.r.appspot.com/api/property-type${!payload ? "" : `?page=${payload}`}`);
        } else {
            response = await axios.get(`https://truevisory-feeder.el.r.appspot.com/api/property-type?search=${payload}`);
        }
        return response.data;
    } catch (error) {
        throw Error(error.response.data.error); // Throw error if API call fails
    }

});


// This Api For Used in Create Data

export const sendDataToPropertyType = (payload) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('https://truevisory-feeder.el.r.appspot.com/api/property-type', { propertyType: payload });
            // Dispatch success action if needed
            dispatch({ type: 'SEND_DATA_SUCCESS', payload: response.data });
        } catch (error) {
            // Dispatch failure action if needed
            dispatch({ type: 'SEND_DATA_FAILURE', error: error.message });
        }
    };
};

export const updatePropertyType = (payload) => {
    return async (dispatch) => {
        try {
            const { propertyTypeId, propertyType } = payload;
            const response = await axios.put(`https://truevisory-feeder.el.r.appspot.com/api/property-type/${propertyTypeId}`, { propertyType: propertyType });
            // Dispatch success action if needed
            dispatch({ type: 'SEND_DATA_SUCCESS', payload: response.data });
        } catch (error) {
            // Dispatch failure action if needed
            dispatch({ type: 'SEND_DATA_FAILURE', error: error.message });
        }
    };
};

const propertySlice = createSlice({
    name: 'property',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(propertyResponseData.pending, (state) => {
                state.loading = true;
            })
            .addCase(propertyResponseData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(propertyResponseData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default propertySlice.reducer;
// export const { fetchData }=dataSlice.actions;
// export const { extraReducers } = projectSlice.actions;

