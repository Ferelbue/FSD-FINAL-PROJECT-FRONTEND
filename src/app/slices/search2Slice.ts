
import { createSlice } from '@reduxjs/toolkit';

export const search2Slice = createSlice({
  name: 'search2',
  initialState: {
    criteria2: ""
  },
  reducers: {
    updateCriteria2: (state, action) => {
      return {
        ...state,
        criteria: action.payload
      }
    }
  }

});

export const { updateCriteria2 } = search2Slice.actions;

export const searchData2 = (state: any) => state.search2;

export default search2Slice.reducer;