import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import communityReducer from './communitySlice';
import feedReducer from './feedSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    community: communityReducer,
    feed: feedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
