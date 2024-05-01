
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import categorySlice from './slices/categorySlice';

import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import productDetailSlice from './slices/productDetailSlice';
import notificationSlice from './slices/notificationSlice';
import searchSlice from './slices/searchSlice';

const reducers:any = combineReducers({
    user: userSlice,
    category: categorySlice,
    productDetail: productDetailSlice,
    notification: notificationSlice,
    search: searchSlice
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