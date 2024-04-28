
import { createSlice } from '@reduxjs/toolkit';

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    category: {}
  },
  reducers: {
    updateCategory: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    }

  }

});

//exporto las ACCIONES.....
export const { updateCategory } = categorySlice.actions;

export const categoryData = (state: any) => state.category;

export default categorySlice.reducer;