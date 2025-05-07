/**
 * ユーザー状態管理Slice
 * @description ユーザーのログイン状態・情報・コミュニティ選択を管理するRedux slice
 * @remarks
 * - presentation層で管理し、UI全体で利用します。
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../domain/user";

/** ユーザー状態の型 */
export interface UserState {
  /** ログイン中ユーザー */
  currentUser: User | null;
  /** ログイン状態 */
  isLoggedIn: boolean;
}

/** 初期状態 */
const initialState: UserState = {
  currentUser: null,
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    /** ログイン */
    login(state, action: PayloadAction<User>) {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
    },
    /** ログアウト */
    logout(state) {
      state.currentUser = null;
      state.isLoggedIn = false;
    },
    /** コミュニティ選択 */
    selectCommunities(state, action: PayloadAction<string[]>) {
      if (state.currentUser) {
        state.currentUser.communityIds = action.payload;
      }
    },
    /** プロフィール更新 */
    updateProfile(state, action: PayloadAction<Partial<User>>) {
      if (state.currentUser) {
        Object.assign(state.currentUser, action.payload);
      }
    },
  },
});

export const { login, logout, selectCommunities, updateProfile } =
  userSlice.actions;
export default userSlice.reducer;
