/**
 * PostCard コンポーネント
 *
 * @概要
 *   - 投稿情報をカード形式で表示するUIコンポーネント。
 *
 * @主な仕様
 *   - ユーザー名・アバター・本文・いいね・コメント数・日付・いいねボタンを表示
 *   - Material-UIのCardコンポーネントを利用
 */
import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

import type { Post, User } from "../../../types";

interface PostCardProps {
  post: Post;
  user: User;
  liked: boolean;
  onLike: () => void;
  onCommentClick: () => void;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  user,
  liked,
  onLike,
  onCommentClick,
}) => (
  <Card sx={{ mb: 2 }}>
    <CardHeader
      avatar={
        <Avatar src={user.avatarUrl || undefined}>{user.userName[0]}</Avatar>
      }
      title={user.userName}
      subheader={new Date(post.createdAt).toLocaleString("ja-JP")}
    />
    <CardContent>
      <Typography variant="body1">{post.content}</Typography>
    </CardContent>
    <CardActions disableSpacing>
      <IconButton
        aria-label="いいね"
        color={liked ? "error" : "default"}
        onClick={onLike}
      >
        <FavoriteIcon />
        <Typography variant="caption" sx={{ ml: 0.5 }}>
          {post.likeCount}
        </Typography>
      </IconButton>
      <IconButton aria-label="コメント" onClick={onCommentClick}>
        <ChatBubbleOutlineIcon />
        <Typography variant="caption" sx={{ ml: 0.5 }}>
          {post.commentCount}
        </Typography>
      </IconButton>
    </CardActions>
  </Card>
);

export default PostCard;
