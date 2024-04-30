
import { createSlice } from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notification: {}
  },
  reducers: {
    updateNotification: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    }

  }

});

//exporto las ACCIONES.....
export const { updateNotification } = notificationSlice.actions;

export const notificationData = (state: any) => state.notification;

export default notificationSlice.reducer;