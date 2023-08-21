import { configureStore } from '@reduxjs/toolkit';
import { persistReducer,persistCombineReducers } from 'redux-persist';
import {persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import  { authReducer } from './features/auth/authSlice';
import { inquiryReducer } from './features/inquiry/inquirySlice';
import  {mediaReducer} from './features/media/mediaSlice'
import { notificationReducer } from './features/notification/notificationSlice';
import { roleReducer } from './features/role/roleSlice';
import { userReducer } from './features/users/userSlice';
import { vehicleReducer } from './features/vehicle/vehicleSlice';
import { webContentReducer } from './features/webcontent/webContentSlice';

// Define persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const rootReducer={
  auth: authReducer,
  media: mediaReducer,
  vehicles:vehicleReducer,
  role:roleReducer,
  user:userReducer,
  inquiry:inquiryReducer,
  webContent:webContentReducer,
  notification:notificationReducer
}
// // Export reducer with persistence
// const persistedCombineReducer= persistCombineReducers(persistConfig, reducer);


// const store = configureStore(persistedCombineReducer);


const persistCombinedReducers = persistCombineReducers(
  persistConfig,
  rootReducer,
  );
  
export const store = configureStore({
  reducer:persistCombinedReducers
});
export const persistor = persistStore(store);
