import React from 'react';
import { Post } from '../../domain/entities/Post';

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike, onComment }) => {
  return (
    <div className="post-card">
      <div className="post-header">
        <h3>{post.title}</h3>
        <p>{post.createdAt}</p>
      </div>
      <div className="post-content">
        <p>{post.content}</p>
      </div>
      <div className="post-actions">
        <button onClick={() => onLike(post.id)}>Like</button>
        <button onClick={() => onComment(post.id)}>Comment</button>
      </div>
    </div>
  );
};

export default PostCard;