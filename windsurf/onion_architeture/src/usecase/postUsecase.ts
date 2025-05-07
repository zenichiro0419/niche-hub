// ユースケース層: 投稿関連
import { Post } from '@domain/post';

let dummyPosts: Post[] = [];

export const createPost = (communityId: string, userId: string, content: string): Post => {
  const post: Post = {
    id: String(Date.now()),
    communityId,
    userId,
    content,
    createdAt: new Date().toISOString(),
    likeCount: 0
  };
  dummyPosts = [post, ...dummyPosts];
  return post;
};

export const getPostsByCommunity = (communityId: string): Post[] => {
  return dummyPosts.filter(p => p.communityId === communityId);
};

export const likePost = (postId: string): void => {
  dummyPosts = dummyPosts.map(p => p.id === postId ? { ...p, likeCount: p.likeCount + 1 } : p);
};

export const unlikePost = (postId: string): void => {
  dummyPosts = dummyPosts.map(p => p.id === postId && p.likeCount > 0 ? { ...p, likeCount: p.likeCount - 1 } : p);
};
