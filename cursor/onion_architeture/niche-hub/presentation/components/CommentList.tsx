/**
 * コメントリストコンポーネント
 * @description 投稿に紐づくコメント一覧を表示。空状態メッセージ付き。
 */
import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Comment } from "../../domain/comment";

interface CommentListProps {
  comments: Comment[];
  getUserName: (userId: string) => string;
  getUserAvatar: (userId: string) => string;
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  getUserName,
  getUserAvatar,
}) => {
  if (comments.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        コメントはまだありません。
      </Typography>
    );
  }
  return (
    <List>
      {comments.map((comment) => (
        <ListItem key={comment.id} alignItems="flex-start" disableGutters>
          <ListItemAvatar>
            <Avatar src={getUserAvatar(comment.userId)}>
              {getUserName(comment.userId).slice(0, 2)}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={comment.content}
            secondary={
              <>
                <Typography
                  component="span"
                  variant="caption"
                  color="text.secondary"
                >
                  {getUserName(comment.userId)}・
                  {new Date(comment.createdAt).toLocaleString()}
                </Typography>
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default CommentList;
