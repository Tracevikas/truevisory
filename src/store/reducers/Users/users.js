import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const usersResponseData = createAsyncThunk('users/usersResponseData', async (payload) => {
    try {
        let response = await axios.get(`https://truevisory-feeder.el.r.appspot.com/api/employees`);
        return response.data;
    } catch (error) {
        throw Error(error.response.data.error); // Throw error if API call fails
    }

});

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        data: [],
        loading: false,
        error: null,
        // isSuccess: ''
    },
    reducers: {},
    extraReducers: (users) => {
        users
            .addCase(usersResponseData.pending, (state) => {
                state.loading = true;
            })
            .addCase(usersResponseData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(usersResponseData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default usersSlice.reducer;