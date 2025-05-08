/**
 * Reduxストア統合
 *
 * @概要
 *   - 全てのsliceを統合し、アプリ全体の状態管理を行う。
 */
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import communityReducer from "./communitySlice";
import postReducer from "./postSlice";
import commentReducer from "./commentSlice";
import notificationReducer from "./notificationSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    community: communityReducer,
    post: postReducer,
    comment: commentReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
