/**
 * コミュニティ状態管理Slice
 * @description 全コミュニティリスト・選択中コミュニティIDを管理するRedux slice
 * @remarks
 * - presentation層で管理し、UI全体で利用します。
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Community } from "../domain/community";

/** コミュニティ状態の型 */
export interface CommunityState {
  /** 全コミュニティリスト */
  communities: Community[];
  /** 選択中コミュニティID */
  selectedCommunityId: string | null;
}

/** 初期状態 */
const initialState: CommunityState = {
  communities: [],
  selectedCommunityId: null,
};

export const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    /** コミュニティ一覧セット */
    setCommunities(state, action: PayloadAction<Community[]>) {
      state.communities = action.payload;
    },
    /** コミュニティ選択 */
    selectCommunity(state, action: PayloadAction<string>) {
      state.selectedCommunityId = action.payload;
    },
  },
});

export const { setCommunities, selectCommunity } = communitySlice.actions;
export default communitySlice.reducer;
