import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Community } from '../domain/entities/Community';

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
    selectCommunity(state, action: PayloadAction<string>) {
      state.selectedCommunityId = action.payload;
    },
    clearSelectedCommunity(state) {
      state.selectedCommunityId = null;
    },
  },
});

export const { setCommunities, selectCommunity, clearSelectedCommunity } = communitySlice.actions;

export default communitySlice.reducer;