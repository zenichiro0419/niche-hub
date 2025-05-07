/**
 * @file store/index.ts
 * @brief Redux Toolkitストア設定
 * @description ユーザー情報・コミュニティ選択状態を管理するグローバルストア。
 */
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import communityReducer from "./communitySlice";

/**
 * Reduxストア
 */
export const store = configureStore({
  reducer: {
    user: userReducer,
    community: communityReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
