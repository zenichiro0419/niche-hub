/**
 * 投稿カードコンポーネント
 * @description 投稿の内容・ユーザー情報・いいね・コメントボタンを表示。アニメーション付き。
 */
import React from "react";
import {
  Paper,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  IconButton,
  Tooltip,
  Divider,
  Box,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import { motion } from "framer-motion";
import { Post } from "../../domain/post";

interface PostCardProps {
  post: Post;
  userName: string;
  userAvatar: string;
  liked: boolean;
  likeCount: number;
  onLike: () => void;
  onShowComments: () => void;
  children?: React.ReactNode;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  userName,
  userAvatar,
  liked,
  likeCount,
  onLike,
  onShowComments,
  children,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Paper sx={{ mb: 2, p: 2 }}>
        <ListItem alignItems="flex-start" disableGutters>
          <ListItemAvatar>
            <Avatar src={userAvatar}>{userName.slice(0, 2)}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <>
                <Typography fontWeight="bold">{userName}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(post.createdAt).toLocaleString()}
                </Typography>
              </>
            }
            secondary={
              <Typography sx={{ whiteSpace: "pre-line" }}>
                {post.content}
              </Typography>
            }
          />
        </ListItem>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
          <Tooltip title="いいね">
            <motion.div
              whileTap={{ scale: 1.3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <IconButton
                onClick={onLike}
                size="small"
                aria-label={liked ? "いいねを取り消す" : "いいねする"}
                tabIndex={0}
              >
                {liked ? (
                  <FavoriteIcon color="error" />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
            </motion.div>
          </Tooltip>
          <Typography variant="caption">{likeCount} いいね</Typography>
          <Button
            size="small"
            startIcon={<CommentIcon />}
            onClick={onShowComments}
            sx={{ ml: 2 }}
          >
            コメント
          </Button>
        </Box>
        <Divider sx={{ my: 1 }} />
        {children}
      </Paper>
    </motion.div>
  );
};

export default PostCard;
