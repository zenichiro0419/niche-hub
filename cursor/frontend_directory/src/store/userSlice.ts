/**
 * ユーザー管理用Redux slice
 *
 * @概要
 *   - ユーザー情報・認証状態を管理する。
 *   - 初期値はダミーユーザー。
 */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types";
import { dummyUsers } from "../features/user/functions/dummyUsers";

export type UserState = {
  users: User[];
  currentUserId: string | null;
};

const initialState: UserState = {
  users: dummyUsers,
  currentUserId: dummyUsers[0].id, // 管理者をデフォルトログイン
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUserId(state, action: PayloadAction<string | null>) {
      state.currentUserId = action.payload;
    },
    updateUser(state, action: PayloadAction<User>) {
      const idx = state.users.findIndex((u) => u.id === action.payload.id);
      if (idx !== -1) state.users[idx] = action.payload;
    },
  },
});

export const { setCurrentUserId, updateUser } = userSlice.actions;
export default userSlice.reducer;
