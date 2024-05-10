
import { createSlice } from '@reduxjs/toolkit';

export const search3Slice = createSlice({
  name: 'search3',
  initialState: {
    criteria3: ""
  },
  reducers: {
    updateCriteria3: (state, action) => {
      return {
        ...state,
        criteria: action.payload
      }
    }
  }

});

export const { updateCriteria3 } = search3Slice.actions;

export const searchData3 = (state: any) => state.search3;

export default search3Slice.reducer;