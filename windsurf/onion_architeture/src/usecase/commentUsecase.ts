// ユースケース層: コメント関連
import { Comment } from '@domain/comment';

let dummyComments: Comment[] = [];

export const addComment = (postId: string, userId: string, content: string): Comment => {
  const comment: Comment = {
    id: String(Date.now()),
    postId,
    userId,
    content,
    createdAt: new Date().toISOString()
  };
  dummyComments = [comment, ...dummyComments];
  return comment;
};

export const getCommentsByPost = (postId: string): Comment[] => {
  return dummyComments.filter(c => c.postId === postId);
};
