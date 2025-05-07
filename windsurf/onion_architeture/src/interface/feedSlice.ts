import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../domain/post';

interface FeedState {
  posts: Post[];
}

const initialState: FeedState = {
  posts: [],
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload;
    },
    addPost(state, action: PayloadAction<Post>) {
      state.posts.unshift(action.payload);
    },
    clearPosts(state) {
      state.posts = [];
    },
  },
});

export const { setPosts, addPost, clearPosts } = feedSlice.actions;
export default feedSlice.reducer;
