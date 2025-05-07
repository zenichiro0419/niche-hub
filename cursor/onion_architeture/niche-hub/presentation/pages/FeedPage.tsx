/**
 * フィードページ
 * @description 所属コミュニティの投稿一覧・投稿作成フォーム・いいね・コメント・コミュニティ切替を表示
 */
import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Typography,
  Paper,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SendIcon from "@mui/icons-material/Send";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { addPost, setPosts, toggleLike } from "../postSlice";
import { addComment, setComments } from "../commentSlice";
import { selectCommunity, setCommunities } from "../communitySlice";
import { Post } from "../../domain/post";
import { Comment } from "../../domain/comment";
import {
  DummyPostRepository,
  DummyCommentRepository,
  DummyCommunityRepository,
} from "../../infrastructure/repository";
import {
  createPost,
  toggleLike as toggleLikeUseCase,
  getComments,
} from "../../application/postUseCase";
import { createComment as createCommentUseCase } from "../../application/commentUseCase";
import Sidebar from "../components/Sidebar";
import PostCard from "../components/PostCard";
import CommentList from "../components/CommentList";
import PrimaryButton from "../components/PrimaryButton";

const postRepository = new DummyPostRepository();
const commentRepository = new DummyCommentRepository();
const communityRepository = new DummyCommunityRepository();

const FeedPage: React.FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const allCommunities = useSelector(
    (state: RootState) => state.community.communities
  );
  // 所属コミュニティのみ抽出
  const userCommunities = allCommunities.filter((c) =>
    currentUser?.communityIds.includes(c.id)
  );
  const selectedCommunityId =
    useSelector((state: RootState) => state.community.selectedCommunityId) ||
    (userCommunities[0]?.id ?? "");
  const posts = useSelector((state: RootState) => state.post.posts).filter(
    (p) => p.communityId === selectedCommunityId
  );
  const comments = useSelector((state: RootState) => state.comment.comments);
  const [content, setContent] = useState("");
  const [commentContent, setCommentContent] = useState<{
    [postId: string]: string;
  }>({});
  const [error, setError] = useState("");

  React.useEffect(() => {
    // コミュニティ一覧を初期化
    dispatch(setCommunities(communityRepository.findAll()));
    dispatch(setPosts(postRepository.findAllByCommunity(selectedCommunityId)));
    dispatch(setComments([]));
  }, [dispatch, selectedCommunityId]);

  if (!currentUser) {
    return (
      <Container sx={{ mt: 8 }}>
        <Typography>ログインしてください。</Typography>
      </Container>
    );
  }

  const handlePost = () => {
    setError("");
    if (!content.trim()) {
      setError("投稿内容を入力してください。");
      return;
    }
    if (content.length > 280) {
      setError("投稿は280文字以内で入力してください。");
      return;
    }
    const post = new Post(
      "p" + Math.random().toString(36).substring(2, 8),
      currentUser.id,
      selectedCommunityId,
      content,
      new Date().toISOString(),
      []
    );
    createPost(postRepository, post);
    dispatch(addPost(post));
    setContent("");
  };

  const handleLike = (postId: string) => {
    if (!currentUser) return;
    const updated = toggleLikeUseCase(postRepository, postId, currentUser.id);
    if (updated) {
      dispatch(toggleLike({ postId, userId: currentUser.id }));
    }
  };

  const handleComment = (postId: string) => {
    const text = commentContent[postId]?.trim();
    if (!text) return;
    const comment = new Comment(
      "cm" + Math.random().toString(36).substring(2, 8),
      postId,
      currentUser.id,
      text,
      new Date().toISOString()
    );
    createCommentUseCase(commentRepository, comment);
    dispatch(addComment(comment));
    setCommentContent((prev) => ({ ...prev, [postId]: "" }));
  };

  const handleShowComments = (postId: string) => {
    const postComments = getComments(commentRepository, postId);
    dispatch(setComments(postComments));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        minHeight: "100vh",
        bgcolor: "#eceff1",
      }}
    >
      <Sidebar />
      <Container maxWidth="sm" sx={{ mt: 4, mb: 4, flex: 1 }}>
        <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel>コミュニティ切替</InputLabel>
            <Select
              value={selectedCommunityId}
              label="コミュニティ切替"
              onChange={(e) => dispatch(selectCommunity(e.target.value))}
            >
              {userCommunities.map((c) => (
                <MenuItem value={c.id} key={c.id}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" fontWeight="bold">
            新規投稿
          </Typography>
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <TextField
            label="いまどうしてる？"
            multiline
            fullWidth
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            inputProps={{ maxLength: 280 }}
            sx={{ mt: 1 }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
            <PrimaryButton onClick={handlePost}>投稿</PrimaryButton>
          </Box>
        </Paper>
        {posts.length === 0 ? (
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mt: 4 }}
          >
            投稿はまだありません。
          </Typography>
        ) : (
          posts.map((post) => {
            const user =
              allCommunities.find((u) => u.id === post.communityId) ||
              currentUser;
            return (
              <PostCard
                key={post.id}
                post={post}
                userName={currentUser?.userName || ""}
                userAvatar={currentUser?.profileImageUrl || ""}
                liked={post.likedUserIds.includes(currentUser.id)}
                likeCount={post.likedUserIds.length}
                onLike={() => handleLike(post.id)}
                onShowComments={() => handleShowComments(post.id)}
              >
                <CommentList
                  comments={comments.filter((c) => c.postId === post.id)}
                  getUserName={(uid) => currentUser?.userName || ""}
                  getUserAvatar={(uid) => currentUser?.profileImageUrl || ""}
                />
                <ListItem disableGutters>
                  <TextField
                    label="コメントを入力"
                    size="small"
                    fullWidth
                    value={commentContent[post.id] || ""}
                    onChange={(e) =>
                      setCommentContent((prev) => ({
                        ...prev,
                        [post.id]: e.target.value,
                      }))
                    }
                    sx={{ mr: 1 }}
                  />
                  <IconButton
                    color="primary"
                    onClick={() => handleComment(post.id)}
                  >
                    <SendIcon />
                  </IconButton>
                </ListItem>
              </PostCard>
            );
          })
        )}
      </Container>
    </Box>
  );
};

export default FeedPage;
