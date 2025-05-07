import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Community } from '../domain/community';

interface CommunityState {
  communities: Community[];
  selectedCommunityId: string | null;
}

const initialState: CommunityState = {
  communities: [],
  selectedCommunityId: null,
};

const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    setCommunities(state, action: PayloadAction<Community[]>) {
      state.communities = action.payload;
    },
    selectCommunity(state, action: PayloadAction<string | null>) {
      state.selectedCommunityId = action.payload;
    },
  },
});

export const { setCommunities, selectCommunity } = communitySlice.actions;
export default communitySlice.reducer;
