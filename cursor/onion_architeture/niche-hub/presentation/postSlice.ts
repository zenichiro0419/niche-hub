/**
 * 投稿状態管理Slice
 * @description 全投稿リストを管理し、CRUD・いいね操作に対応するRedux slice
 * @remarks
 * - presentation層で管理し、UI全体で利用します。
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../domain/post";

/** 投稿状態の型 */
export interface PostState {
  /** 全投稿リスト */
  posts: Post[];
}

/** 初期状態 */
const initialState: PostState = {
  posts: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    /** 投稿一覧セット */
    setPosts(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload;
    },
    /** 投稿追加 */
    addPost(state, action: PayloadAction<Post>) {
      state.posts.unshift(action.payload);
    },
    /** 投稿更新 */
    updatePost(state, action: PayloadAction<Post>) {
      const idx = state.posts.findIndex((p) => p.id === action.payload.id);
      if (idx !== -1) state.posts[idx] = action.payload;
    },
    /** 投稿削除 */
    deletePost(state, action: PayloadAction<string>) {
      state.posts = state.posts.filter((p) => p.id !== action.payload);
    },
    /** いいねトグル */
    toggleLike(
      state,
      action: PayloadAction<{ postId: string; userId: string }>
    ) {
      const post = state.posts.find((p) => p.id === action.payload.postId);
      if (post) {
        const idx = post.likedUserIds.indexOf(action.payload.userId);
        if (idx === -1) {
          post.likedUserIds.push(action.payload.userId);
        } else {
          post.likedUserIds.splice(idx, 1);
        }
      }
    },
  },
});

export const { setPosts, addPost, updatePost, deletePost, toggleLike } =
  postSlice.actions;
export default postSlice.reducer;
