import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userName: string | null;
}

const initialState: UserState = {
  userName: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName(state, action: PayloadAction<string | null>) {
      state.userName = action.payload;
    },
    logout(state) {
      state.userName = null;
    },
  },
});

export const { setUserName, logout } = userSlice.actions;
export default userSlice.reducer;
