/**
 * @file communitySlice.ts
 * @brief コミュニティ選択状態管理用Redux slice
 * @description 選択中のコミュニティIDリストを管理。
 */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/**
 * @typedef {Object} CommunityState
 * @property {string[]} selectedCommunityIds - 選択中のコミュニティIDリスト
 * @property {string} currentCommunityId - 現在選択中のコミュニティID
 */
export interface CommunityState {
  selectedCommunityIds: string[];
  currentCommunityId: string;
}

const initialState: CommunityState = {
  selectedCommunityIds: [],
  currentCommunityId: "",
};

const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    setSelectedCommunities: (state, action: PayloadAction<string[]>) => {
      state.selectedCommunityIds = action.payload;
      // 最初の選択をcurrentCommunityIdに自動設定
      if (action.payload.length > 0) {
        state.currentCommunityId = action.payload[0];
      } else {
        state.currentCommunityId = "";
      }
    },
    setCurrentCommunityId: (state, action: PayloadAction<string>) => {
      state.currentCommunityId = action.payload;
    },
    resetCommunities: (state) => {
      state.selectedCommunityIds = [];
      state.currentCommunityId = "";
    },
  },
});

export const {
  setSelectedCommunities,
  setCurrentCommunityId,
  resetCommunities,
} = communitySlice.actions;
export default communitySlice.reducer;
