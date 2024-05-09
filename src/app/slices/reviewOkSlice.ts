
import { createSlice } from '@reduxjs/toolkit';

export const reviewOkSlice = createSlice({
  name: 'reviewOk',
  initialState: {
    reviewOk: {}
  },
  reducers: {
    updateReviewOk: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    }

  }

});

//exporto las ACCIONES.....
export const { updateReviewOk } = reviewOkSlice.actions;

export const reviewOkData = (state: any) => state.reviewOk;

export default reviewOkSlice.reducer;