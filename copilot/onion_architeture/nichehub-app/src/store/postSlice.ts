import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../domain/entities/Post';

interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    fetchPostsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPostsSuccess(state, action: PayloadAction<Post[]>) {
      state.loading = false;
      state.posts = action.payload;
    },
    fetchPostsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    createPost(state, action: PayloadAction<Post>) {
      state.posts.push(action.payload);
    },
    deletePost(state, action: PayloadAction<number>) {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
  },
});

export const {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  createPost,
  deletePost,
} = postSlice.actions;

export default postSlice.reducer;