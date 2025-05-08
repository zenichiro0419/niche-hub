import React, { useState } from 'react';
import { Comment } from '../../domain/entities/Comment';

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (comment: Comment) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now(), // Temporary ID generation
        content: newComment,
        createdAt: new Date().toISOString(),
      };
      onAddComment(comment);
      setNewComment('');
    }
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Add a comment..."
          required
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.content}</p>
            <small>{new Date(comment.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;