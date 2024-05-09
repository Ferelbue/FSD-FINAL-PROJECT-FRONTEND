
import { createSlice } from '@reduxjs/toolkit';

export const uploadOkSlice = createSlice({
  name: 'uploadOk',
  initialState: {
    uploadOk: {}
  },
  reducers: {
    updateUploadOk: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    }

  }

});

//exporto las ACCIONES.....
export const { updateUploadOk } = uploadOkSlice.actions;

export const uploadOkData = (state: any) => state.uploadOk;

export default uploadOkSlice.reducer;