/**
 * グローバルストア定義
 * @description Redux ToolkitによるNicheHubの状態管理ストア
 * @remarks
 * - presentation層で管理し、UI全体の状態を一元管理します。
 */
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import communityReducer from "./communitySlice";
import postReducer from "./postSlice";
import commentReducer from "./commentSlice";

// 今後、userSlice, communitySlice, postSlice, commentSliceなどを追加予定

export const store = configureStore({
  reducer: {
    user: userReducer,
    community: communityReducer,
    post: postReducer,
    comment: commentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
