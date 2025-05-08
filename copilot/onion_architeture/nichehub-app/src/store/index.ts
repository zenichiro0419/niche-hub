import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import postReducer from './postSlice';
import communityReducer from './communitySlice';
import notificationReducer from './notificationSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    community: communityReducer,
    notification: notificationReducer,
  },
});

export default store;