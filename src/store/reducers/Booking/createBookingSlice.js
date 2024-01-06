import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const createBooking = (payload) => {
  return async (dispatch) => {
    try {
      const body =
      {
        "bookingStatus": payload.bookingStatus,
        "bookingType": payload.bookingType,
        "bookingDate": payload.bookingDate,
        "scanLink": payload.scanLink,
        "bookingById": payload.bookingById,
        "bookingSharedById": payload.bookingSharedById,
        "branch": payload.branch,
        "builderDetails": {
          "builder": payload.builder,
          "project": payload.project,
          "unit": payload.unit
        },
        "clientDetails": {
          "clientName": payload.clientName,
          "clientContactNo": payload.clientContactNo,
          "clientEmailId": payload.clientEmailId,
          "clientAadhaarNo": payload.clientAadhaarNo,
          "clientPanNo": payload.clientPanNo,
          "clientCoApplicant": payload.clientCoApplicant,
          "clientRemarks": payload.clientRemarks
        },
        "brokerDetails": {
          "brokerName": payload.brokerName,
          "brokerPanNo": payload.brokerPanNo,
          "brokerAadhaarNo": payload.brokerAadhaarNo,
          "brokerRemarks": payload.brokerRemarks,
          "brokerAmount": Number(payload.brokerAmount)
        },
        "costRelatedDetails": {
          "bsp": Number(payload.bsp),
          "gst": Number(payload.gst),
          "bspCost": payload.bspCost,
          "totalCost": payload.totalCost,
          "discountSet": payload.discountSet,
          "otherChargesSet": payload.otherChargesSet
        },
        "amountReceivedDetails": payload.amountReceivedDetails,
        "retentionDetails": payload.retentionDetails,
        "agreementDetails": {
          "welcomeLetter": payload.welcomeLetter,
          "welcomeLetterDate": payload.welcomeLetterDate,
          "bba": payload.bba,
          "bbaDate": payload.bbaDate,
          "rc": payload.rc,
          "rcRemarks": payload.rcRemarks,
          "ra": payload.ra,
          "raRemarks": payload.raRemarks,
          "registry": payload.registry
        },
        "refundDetails": {
          "refundAmount": Number(payload.refundAmount),
          "refundReason": payload.refundReason,
          "refundDate": payload.refundDate
        },
        "miscDetails": {
          "incentive": payload.incentive,
          "scheme": payload.scheme,
          "sifStatus": payload.sifStatus,
          "sifLink": payload.sifLink,
          "bookingRemarks": payload.bookingRemarks
        }
      }
      const response = await axios.post('https://truevisory-feeder.el.r.appspot.com/api/booking', body);
      // Dispatch success action if needed
      dispatch({
        type: 'SEND_DATA_SUCCESS', payload: response.data

      });
      return response;
    } catch (error) {
      dispatch({ type: 'SEND_DATA_FAILURE', error: error.message });
      throw error;
    }
  };
}
export const updateBooking = (payload, bookingId) => {
  return async (dispatch) => {
    try {
      const body =
      {
        "bookingStatus": payload.bookingStatus,
        "bookingType": payload.bookingType,
        "bookingDate": payload.bookingDate,
        "scanLink": payload.scanLink,
        "bookingById": payload.bookingById,
        "bookingSharedById": payload.bookingSharedById,
        "branch": payload.branch,
        "builderDetails": {
          "builder": payload.builder,
          "project": payload.project,
          "unit": payload.unit
        },
        "clientDetails": {
          "clientName": payload.clientName,
          "clientContactNo": payload.clientContactNo,
          "clientEmailId": payload.clientEmailId,
          "clientAadhaarNo": payload.clientAadhaarNo,
          "clientPanNo": payload.clientPanNo,
          "clientCoApplicant": payload.clientCoApplicant,
          "clientRemarks": payload.clientRemarks
        },
        "brokerDetails": {
          "brokerName": payload.brokerName,
          "brokerPanNo": payload.brokerPanNo,
          "brokerAadhaarNo": payload.brokerAadhaarNo,
          "brokerRemarks": payload.brokerRemarks,
          "brokerAmount": Number(payload.brokerAmount)
        },
        "costRelatedDetails": {
          "bsp": Number(payload.bsp),
          "gst": Number(payload.gst),
          "bspCost": payload.bspCost,
          "totalCost": payload.totalCost,
          "discountSet": payload.discountSet,
          "otherChargesSet": payload.otherChargesSet
        },
        "amountReceivedDetails": payload.amountReceivedDetails,
        "retentionDetails": payload.retentionDetails,
        "agreementDetails": {
          "welcomeLetter": payload.welcomeLetter,
          "welcomeLetterDate": payload.welcomeLetterDate,
          "bba": payload.bba,
          "bbaDate": payload.bbaDate,
          "rc": payload.rc,
          "rcRemarks": payload.rcRemarks,
          "ra": payload.ra,
          "raRemarks": payload.raRemarks,
          "registry": payload.registry
        },
        "refundDetails": {
          "refundAmount": Number(payload.refundAmount),
          "refundReason": payload.refundReason,
          "refundDate": payload.refundDate
        },
        "miscDetails": {
          "incentive": payload.incentive,
          "scheme": payload.scheme,
          "sifStatus": payload.sifStatus,
          "sifLink": payload.sifLink,
          "bookingRemarks": payload.bookingRemarks
        }
      }
      const response = await axios.put(`https://truevisory-feeder.el.r.appspot.com/api/booking/${bookingId}`, body);
      // Dispatch success action if needed
      dispatch({
        type: 'SEND_DATA_SUCCESS', payload: response.data

      });
      return response;
    } catch (error) {
      dispatch({ type: 'SEND_DATA_FAILURE', error: error.message });
      throw error;
    }
  };
}
export const builderProjectResponse = createAsyncThunk('project/builderProjectResponse', async ({ payload, search }) => {
  try {
    let response
    if (!payload) {
      response = await axios.get(`https://truevisory-feeder.el.r.appspot.com/api/booking`);
    } else if (typeof payload === 'number') {
      response = await axios.get(`https://truevisory-feeder.el.r.appspot.com/api/booking${`?page=${payload}`}`);
    } else if (typeof payload === 'object') {
      if (payload.bookingId != '') {
        response = await axios.get(`https://truevisory-feeder.el.r.appspot.com/api/booking/${payload.bookingId}`);
      }
    } else {
      response = await axios.get(`https://truevisory-feeder.el.r.appspot.com/api/booking?${search}=${payload}`);
    }
    return response.data;
  } catch (error) {
    throw Error(error.response.data.error); // Throw error if API call fails
  }
});


const createBookingSlice = createSlice({
  name: 'booking',
  initialState: {
    data: {},
    loading: false,
    error: null,
    // isSuccess: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(builderProjectResponse.pending, (state) => {
        state.loading = true;
      })
      .addCase(builderProjectResponse.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(builderProjectResponse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});



export default createBookingSlice.reducer;





