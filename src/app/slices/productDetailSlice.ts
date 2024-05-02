
import { createSlice } from '@reduxjs/toolkit';

export const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState: {
    productDetail: {}
  },
  reducers: {
    updateProductDetail: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    }

  }

});

//exporto las ACCIONES.....
export const { updateProductDetail } = productDetailSlice.actions;

export const productDetailData = (state: any) => state.productDetail;

export default productDetailSlice.reducer;