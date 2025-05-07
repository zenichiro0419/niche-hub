/**
 * @file userSlice.ts
 * @brief ユーザー情報管理用Redux slice
 * @description メールアドレス、ユーザー名、自己紹介、プロフィール画像URLを管理。
 */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/**
 * @typedef {Object} UserState
 * @property {string} email - メールアドレス
 * @property {string} userName - ユーザー名
 * @property {string} bio - 自己紹介
 * @property {string} avatarUrl - プロフィール画像URL
 */
export interface UserState {
  email: string;
  userName: string;
  bio: string;
  avatarUrl: string;
}

const initialState: UserState = {
  email: "",
  userName: "",
  bio: "",
  avatarUrl: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
    resetUser: () => initialState,
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
