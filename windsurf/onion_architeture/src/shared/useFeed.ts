import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../interface/store';
import { setPosts, addPost, clearPosts } from '../interface/feedSlice';

export const useFeed = () => {
  const posts = useSelector((state: RootState) => state.feed.posts);
  const dispatch = useDispatch();
  return {
    posts,
    setPosts: (list: any[]) => dispatch(setPosts(list)),
    addPost: (post: any) => dispatch(addPost(post)),
    clearPosts: () => dispatch(clearPosts()),
  };
};
