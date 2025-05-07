import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUser } from "../../shared/useUser";
import { useFeed } from "../../shared/useFeed";
import { useCommunity } from "../../shared/useCommunity";
import { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  TextField,
  Divider,
  Card,
  CardContent,
} from "@mui/material";

interface Community {
  id: string;
  name: string;
  description: string;
  iconUrl?: string;
}
interface Post {
  id: string;
  communityId: string;
  user: string;
  content: string;
  createdAt: string;
}
interface Comment {
  id: string;
  postId: string;
  user: string;
  content: string;
  createdAt: string;
}

export default function CommunityDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { userName, setUserName } = useUser();
  const { posts, setPosts, addPost } = useFeed();
  const { communities, setCommunities } = useCommunity();
  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(false);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>(
    {}
  );
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [checkingAuth, setCheckingAuth] = useState(true);

  // 初回: localStorageからユーザー名をReduxへ
  useEffect(() => {
    const storedUser = localStorage.getItem("userName");
    setUserName(storedUser || null);
    setCheckingAuth(false);
  }, [setUserName]);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/communities/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // すでに存在しなければ追加、存在すればそのまま
        if (!communities.some((c) => c.id === data.community.id)) {
          setCommunities([...communities, data.community]);
        }
        setPosts(data.posts);
      });
  }, [id, setPosts]);

  // 投稿ごとのコメント取得
  useEffect(() => {
    posts.forEach((post) => {
      fetch(`/api/posts/${post.id}/comments`)
        .then((res) => res.json())
        .then((data) => {
          setComments((prev) => ({ ...prev, [post.id]: data }));
        });
    });
  }, [posts]);

  // 投稿作成
  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !newPost) return;
    setLoading(true);
    const res = await fetch(`/api/communities/${id}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: userName, content: newPost }),
    });
    if (res.ok) {
      const created = await res.json();
      addPost(created);
      setNewPost("");
    }
    setLoading(false);
  };

  // コメント作成
  const handleCommentSubmit = async (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !commentInputs[postId]) return;
    const res = await fetch(`/api/posts/${postId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: userName, content: commentInputs[postId] }),
    });
    if (res.ok) {
      const created = await res.json();
      setComments((prev) => ({
        ...prev,
        [postId]: [...(prev[postId] || []), created],
      }));
      setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
    }
  };

  // 未ログイン時はログインページへ
  useEffect(() => {
    if (!checkingAuth && !userName) {
      router.replace("/login");
    }
  }, [userName, checkingAuth, router]);

  if (checkingAuth) return <Typography>認証確認中...</Typography>;
  if (!communities[id]) return <Typography>読み込み中...</Typography>;

  return (
    <Box maxWidth={780} mx="auto" mt={4}>
      <Card elevation={3} sx={{ mb: 3 }}>
        <CardContent>
          <Typography
            variant="h4"
            gutterBottom
            fontWeight={700}
            color="primary.main"
          >
            {communities[id].name}
            {community.name}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            {community.description}
          </Typography>
        </CardContent>
      </Card>
      <Card elevation={1} sx={{ mb: 3, p: 2 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          投稿一覧
        </Typography>
        <List sx={{ width: "100%" }}>
          {posts.map((post) => (
            <Card key={post.id} elevation={2} sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Avatar sx={{ mr: 2 }}>{post.user[0]}</Avatar>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {post.user}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ ml: 2 }}
                  >
                    {new Date(post.createdAt).toLocaleString()}
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {post.content}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography
                  variant="subtitle2"
                  color="secondary"
                  fontWeight={700}
                  sx={{ mb: 1 }}
                >
                  コメント
                </Typography>
                <List sx={{ pl: 0 }}>
                  {(comments[post.id] || []).map((c) => (
                    <ListItem key={c.id} alignItems="flex-start" sx={{ pl: 0 }}>
                      <Avatar sx={{ mr: 1, width: 28, height: 28 }}>
                        {c.user[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {c.user}
                        </Typography>
                        <Typography variant="body2">{c.content}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(c.createdAt).toLocaleString()}
                        </Typography>
                      </Box>
                    </ListItem>
                  ))}
                </List>
                <form
                  onSubmit={(e) => handleCommentSubmit(post.id, e)}
                  style={{ display: "flex", gap: 8, marginTop: 8 }}
                >
                  <TextField
                    size="small"
                    variant="outlined"
                    placeholder="コメントを書く"
                    value={commentInputs[post.id] || ""}
                    onChange={(e) =>
                      setCommentInputs((prev) => ({
                        ...prev,
                        [post.id]: e.target.value,
                      }))
                    }
                    sx={{ flex: 1 }}
                    disabled={!user}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    disabled={!user || !commentInputs[post.id]}
                  >
                    送信
                  </Button>
                </form>
              </CardContent>
            </Card>
          ))}
        </List>
      </Card>
      <Card elevation={2} sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          新規投稿
        </Typography>
        <form onSubmit={handlePostSubmit} style={{ display: "flex", gap: 8 }}>
          <TextField
            variant="outlined"
            placeholder="投稿内容を書く"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            sx={{ flex: 1 }}
            disabled={!user}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!user || !newPost || loading}
          >
            投稿
          </Button>
        </form>
      </Card>
    </Box>
  );
}
