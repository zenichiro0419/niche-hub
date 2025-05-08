/**
 * 投稿管理用Redux slice
 *
 * @概要
 *   - 投稿情報を管理する。
 *   - 初期値はダミー投稿。
 */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Post } from "../types";
import { dummyPosts } from "../features/feed/functions/dummyPosts";

export type PostState = {
  posts: Post[];
};

const initialState: PostState = {
  posts: dummyPosts,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost(state, action: PayloadAction<Post>) {
      state.posts.unshift(action.payload);
    },
    updatePost(state, action: PayloadAction<Post>) {
      const idx = state.posts.findIndex(
        (p: Post) => p.id === action.payload.id
      );
      if (idx !== -1) state.posts[idx] = action.payload;
    },
    deletePost(state, action: PayloadAction<string>) {
      state.posts = state.posts.filter((p: Post) => p.id !== action.payload);
    },
  },
});

export const { addPost, updatePost, deletePost } = postSlice.actions;
export default postSlice.reducer;
