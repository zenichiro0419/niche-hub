/**
 * @file Feed.tsx
 * @brief フィード画面コンポーネント
 * @description ダミーデータによる投稿リスト表示・投稿作成フォーム・いいね/コメントUI（ダミー動作）を含む。Material-UI利用。
 * @limitations バックエンド連携・実データ保存は未実装。UIのみ。
 */
import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  TextField,
  Button,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Collapse,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

/**
 * @typedef {Object} Post
 * @property {string} id - 投稿ID
 * @property {string} communityId - コミュニティID
 * @property {string} userName - ユーザー名
 * @property {string} userAvatar - ユーザーアバターURL
 * @property {string} content - 投稿内容
 * @property {string} createdAt - 投稿日時
 * @property {number} likes - いいね数
 * @property {number} comments - コメント数
 */
type Post = {
  id: string;
  communityId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: string;
  likes: number;
  comments: number;
};

/**
 * @typedef {Object} Comment
 * @property {string} id - コメントID
 * @property {string} postId - 紐付く投稿ID
 * @property {string} userName - ユーザー名
 * @property {string} content - コメント内容
 * @property {string} createdAt - 投稿日時
 */
type Comment = {
  id: string;
  postId: string;
  userName: string;
  content: string;
  createdAt: string;
};

/**
 * コミュニティ定義（Sidebarと同じ）
 * @type {Object[]}
 */
const dummyCommunities = [
  { id: "1", name: "プログラミング", icon: "💻" },
  { id: "2", name: "写真", icon: "📷" },
  { id: "3", name: "音楽", icon: "🎵" },
  { id: "4", name: "読書", icon: "📚" },
  { id: "5", name: "アウトドア", icon: "🌄" },
];

/**
 * ダミー投稿データ
 * @type {Post[]}
 */
const dummyPosts: Post[] = [
  {
    id: "1",
    communityId: "1",
    userName: "山田太郎",
    userAvatar: "",
    content: "NicheHubへようこそ！これはプログラミングコミュニティの投稿です。",
    createdAt: "2024-05-07 12:00",
    likes: 2,
    comments: 1,
  },
  {
    id: "2",
    communityId: "2",
    userName: "佐藤花子",
    userAvatar: "",
    content: "写真コミュニティでの交流を楽しみましょう！",
    createdAt: "2024-05-07 13:00",
    likes: 1,
    comments: 0,
  },
];

/**
 * フィード画面コンポーネント
 * @returns {JSX.Element} フィード画面UI
 */
const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(dummyPosts);
  const [newPost, setNewPost] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentInputs, setCommentInputs] = useState<{
    [postId: string]: string;
  }>({});
  const [openComments, setOpenComments] = useState<{
    [postId: string]: boolean;
  }>({});
  const currentCommunityId = useSelector(
    (state: RootState) =>
      (state.community as { currentCommunityId: string }).currentCommunityId
  );
  // コミュニティ情報取得
  const currentCommunity = dummyCommunities.find(
    (c) => c.id === currentCommunityId
  );

  /**
   * 投稿作成フォーム送信時の処理（ダミー）
   * @param {React.FormEvent} e
   */
  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim() || !currentCommunityId) return;
    const newItem: Post = {
      id: (posts.length + 1).toString(),
      communityId: currentCommunityId,
      userName: "テストユーザー",
      userAvatar: "",
      content: newPost,
      createdAt: new Date().toLocaleString(),
      likes: 0,
      comments: 0,
    };
    setPosts([newItem, ...posts]);
    setNewPost("");
  };

  /**
   * いいねボタン押下時の処理（ダミー）
   * @param {string} id 投稿ID
   */
  const handleLike = (id: string) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  /**
   * コメントボタン押下時のリスト開閉
   * @param {string} postId
   */
  const handleToggleComments = (postId: string) => {
    setOpenComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  /**
   * コメント投稿フォーム入力変更
   * @param {string} postId
   * @param {string} value
   */
  const handleCommentInputChange = (postId: string, value: string) => {
    setCommentInputs((prev) => ({ ...prev, [postId]: value }));
  };

  /**
   * コメント投稿処理
   * @param {string} postId
   * @param {React.FormEvent} e
   */
  const handleCommentSubmit = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    const content = commentInputs[postId]?.trim();
    if (!content) return;
    const newComment: Comment = {
      id: `${postId}-${Date.now()}`,
      postId,
      userName: "テストユーザー",
      content,
      createdAt: new Date().toLocaleString(),
    };
    setComments((prev) => [newComment, ...prev]);
    setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
  };

  return (
    <Box display="flex" minHeight="100vh" bgcolor="#f5f6fa">
      {/* サイドバー */}
      <Sidebar />
      {/* メインコンテンツ */}
      <Box
        flex={1}
        className="feed-container"
        sx={{ p: { xs: 1, sm: 3 }, maxWidth: 800, margin: "0 auto" }}
      >
        {/* 現在のコミュニティ表示 */}
        <Box display="flex" alignItems="center" mb={2}>
          {currentCommunity ? (
            <>
              <Avatar sx={{ bgcolor: "#eceff1", color: "#263238", mr: 1 }}>
                {currentCommunity.icon}
              </Avatar>
              <Typography variant="h6">
                {currentCommunity.name} コミュニティ
              </Typography>
            </>
          ) : (
            <Typography variant="h6" color="text.secondary">
              コミュニティを選択してください
            </Typography>
          )}
        </Box>
        {/* 投稿作成フォーム */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <form onSubmit={handlePost}>
            <TextField
              label="いまどうしてる？"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              fullWidth
              multiline
              minRows={2}
              variant="outlined"
              disabled={!currentCommunityId}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              fullWidth
              disabled={!currentCommunityId}
            >
              投稿
            </Button>
          </form>
        </Paper>
        {/* 投稿リスト */}
        <List>
          {posts
            .filter((post) => post.communityId === currentCommunityId)
            .map((post) => {
              const postComments = comments.filter((c) => c.postId === post.id);
              return (
                <React.Fragment key={post.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar src={post.userAvatar} alt={post.userName} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Typography variant="subtitle1">
                            {post.userName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {post.createdAt}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Typography
                          variant="body1"
                          sx={{ whiteSpace: "pre-line" }}
                        >
                          {post.content}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <Box display="flex" alignItems="center" pl={7} pb={1}>
                    <IconButton
                      size="small"
                      onClick={() => handleLike(post.id)}
                    >
                      <FavoriteIcon color="error" fontSize="small" />
                    </IconButton>
                    <Typography variant="caption" mr={2}>
                      {post.likes}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleToggleComments(post.id)}
                    >
                      <ChatBubbleOutlineIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="caption">
                      {postComments.length}
                    </Typography>
                  </Box>
                  {/* コメントリスト・フォーム */}
                  <Collapse
                    in={openComments[post.id] || false}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Box pl={7} pr={2} pb={2}>
                      <form onSubmit={(e) => handleCommentSubmit(post.id, e)}>
                        <TextField
                          label="コメントを入力"
                          value={commentInputs[post.id] || ""}
                          onChange={(e) =>
                            handleCommentInputChange(post.id, e.target.value)
                          }
                          fullWidth
                          size="small"
                          margin="dense"
                          inputProps={{ maxLength: 140 }}
                        />
                        <Button
                          type="submit"
                          variant="outlined"
                          size="small"
                          sx={{ mt: 1 }}
                          disabled={!commentInputs[post.id]?.trim()}
                        >
                          コメント
                        </Button>
                      </form>
                      <List dense>
                        {postComments.map((c) => (
                          <ListItem key={c.id} alignItems="flex-start">
                            <ListItemAvatar>
                              <Avatar>{c.userName[0]}</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Box
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="space-between"
                                >
                                  <Typography variant="subtitle2">
                                    {c.userName}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    {c.createdAt}
                                  </Typography>
                                </Box>
                              }
                              secondary={c.content}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </Collapse>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              );
            })}
        </List>
      </Box>
    </Box>
  );
};

export default Feed;
