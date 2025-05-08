/**
 * コメント管理用Redux slice
 *
 * @概要
 *   - コメント情報を管理する。
 *   - 初期値はダミーコメント。
 */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Comment } from "../types";
import { dummyComments } from "../features/feed/functions/dummyComments";

export type CommentState = {
  comments: Comment[];
};

const initialState: CommentState = {
  comments: dummyComments,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    addComment(state, action: PayloadAction<Comment>) {
      state.comments.push(action.payload);
    },
    updateComment(state, action: PayloadAction<Comment>) {
      const idx = state.comments.findIndex(
        (c: Comment) => c.id === action.payload.id
      );
      if (idx !== -1) state.comments[idx] = action.payload;
    },
    deleteComment(state, action: PayloadAction<string>) {
      state.comments = state.comments.filter(
        (c: Comment) => c.id !== action.payload
      );
    },
  },
});

export const { addComment, updateComment, deleteComment } =
  commentSlice.actions;
export default commentSlice.reducer;
