/**
 * コメント状態管理Slice
 * @description 全コメントリストを管理し、追加操作に対応するRedux slice
 * @remarks
 * - presentation層で管理し、UI全体で利用します。
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comment } from "../domain/comment";

/** コメント状態の型 */
export interface CommentState {
  /** 全コメントリスト */
  comments: Comment[];
}

/** 初期状態 */
const initialState: CommentState = {
  comments: [],
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    /** コメント一覧セット */
    setComments(state, action: PayloadAction<Comment[]>) {
      state.comments = action.payload;
    },
    /** コメント追加 */
    addComment(state, action: PayloadAction<Comment>) {
      state.comments.push(action.payload);
    },
  },
});

export const { setComments, addComment } = commentSlice.actions;
export default commentSlice.reducer;
