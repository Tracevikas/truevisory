import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const unitsResponseData = createAsyncThunk('units/unitsResponseData', async (payload) => {
    console.log(payload ,typeof payload);
    try {
        let response;
        if (!payload) {
            response = await axios.get(`https://truevisory-feeder.el.r.appspot.com/api/unit`)
        } else if (typeof payload === 'number') {
            response = await axios.get(`https://truevisory-feeder.el.r.appspot.com/api/unit?page=${payload}`);
        } else if (typeof payload === 'object') {
            response = await axios.get(`https://truevisory-feeder.el.r.appspot.com/api/unit?status=HOLD&project=${payload.projectId}`);
        } else {
            response = await axios.get(`https://truevisory-feeder.el.r.appspot.com/api/unit?search=${payload}`);
        }
        return response.data;
    } catch (error) {
        throw Error(error.response.data.error); // Throw error if API call fails
    }

});

// Create a New Units
export const sendDataToUnits = (payload) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('https://truevisory-feeder.el.r.appspot.com/api/unit', payload);
            dispatch({ type: 'SEND_DATA_SUCCESS', payload: response.data });
        } catch (error) {
            dispatch({ type: 'SEND_DATA_FAILURE', error: error.message });
        }
    };
};
export const updateUnits = (payload) => {
    return async (dispatch) => {
        try {
            const response = await axios.put('https://truevisory-feeder.el.r.appspot.com/api/unit', payload);
            dispatch({ type: 'SEND_DATA_SUCCESS', payload: response.data });
        } catch (error) {
            dispatch({ type: 'SEND_DATA_FAILURE', error: error.message });
        }
    };
};

const unitsSlice = createSlice({
    name: 'units',
    initialState: {
        data: [],
        loading: false,
        error: null,
        // isSuccess: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(unitsResponseData.pending, (state) => {
                state.loading = true;
            })
            .addCase(unitsResponseData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(unitsResponseData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default unitsSlice.reducer;