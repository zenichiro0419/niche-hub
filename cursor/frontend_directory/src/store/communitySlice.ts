/**
 * コミュニティ管理用Redux slice
 *
 * @概要
 *   - コミュニティ情報を管理する。
 *   - 初期値はダミーコミュニティ。
 */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Community } from "../types";
import { dummyCommunities } from "../features/community/functions/dummyCommunities";

export type CommunityState = {
  communities: Community[];
  selectedCommunityId: string | null;
};

const initialState: CommunityState = {
  communities: dummyCommunities,
  selectedCommunityId: dummyCommunities[0].id,
};

export const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    setSelectedCommunityId(state, action: PayloadAction<string | null>) {
      state.selectedCommunityId = action.payload;
    },
    updateCommunity(state, action: PayloadAction<Community>) {
      const idx = state.communities.findIndex(
        (c: Community) => c.id === action.payload.id
      );
      if (idx !== -1) state.communities[idx] = action.payload;
    },
  },
});

export const { setSelectedCommunityId, updateCommunity } =
  communitySlice.actions;
export default communitySlice.reducer;
