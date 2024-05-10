
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import categorySlice from './slices/categorySlice';

import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import productDetailSlice from './slices/productDetailSlice';
import notificationSlice from './slices/notificationSlice';
import searchSlice from './slices/searchSlice';
import search2Slice from './slices/search2Slice';
import uploadOkSlice from './slices/uploadOkSlice';
import reviewOkSlice from './slices/reviewOkSlice';
import search3Slice from './slices/search3Slice';

const reducers:any = combineReducers({
    user: userSlice,
    category: categorySlice,
    productDetail: productDetailSlice,
    notification: notificationSlice,
    search: searchSlice,
    search2: search2Slice,
    search3: search3Slice,
    uploadOk: uploadOkSlice,
    reviewOk: reviewOkSlice
});


const persistConfig = {
  key: 'root',
  storage: storage,
};

const _persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: _persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
  }),
});