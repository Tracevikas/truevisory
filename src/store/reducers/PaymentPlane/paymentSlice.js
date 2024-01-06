// dataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const paymentResponseData = createAsyncThunk('payment/paymentResponseData', async (payload) => {
    try {
        let response;
        if (typeof payload === 'number' || !payload) {
            response = await axios.get(`https://truevisory-feeder.el.r.appspot.com/api/payment-plan${!payload ? '' : `?page=${payload}`}`);
        } else {
            response = await axios.get(`https://truevisory-feeder.el.r.appspot.com/api/payment-plan?search=${payload}`);
        }
        return response.data;
    } catch (error) {
        throw Error(error.response.data.error); // Throw error if API call fails
    }
});


export const sendDataToPaymentPlane = (payload) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('https://truevisory-feeder.el.r.appspot.com/api/payment-plan', { paymentPlan: payload });
            // Dispatch success action if needed
            dispatch({ type: 'SEND_DATA_SUCCESS', payload: response.data });
        } catch (error) {
            // Dispatch failure action if needed
            dispatch({ type: 'SEND_DATA_FAILURE', error: error.message });
        }
    };
};

export const updatePaymentPlane = (payload) => {
    return async (dispatch) => {
        try {
            const { paymentPlanId, paymentPlan } = payload
            const response = await axios.put(`https://truevisory-feeder.el.r.appspot.com/api/payment-plan/${paymentPlanId}`, { paymentPlan: paymentPlan });
            // Dispatch success action if needed
            dispatch({ type: 'SEND_DATA_SUCCESS', payload: response.data });
        } catch (error) {
            // Dispatch failure action if needed
            dispatch({ type: 'SEND_DATA_FAILURE', error: error.message });
        }
    };
};

const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(paymentResponseData.pending, (state) => {
                state.loading = true;
            })
            .addCase(paymentResponseData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(paymentResponseData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default paymentSlice.reducer;
// export const { fetchData }=dataSlice.actions;
// export const { extraReducers } = projectSlice.actions;

