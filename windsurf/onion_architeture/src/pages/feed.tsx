import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  Button,
  Divider,
  Skeleton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";
import Link from "next/link";
import { useUser } from "../shared/useUser";
import { useFeed } from "../shared/useFeed";
import { useCommunity } from "../shared/useCommunity";

export default function Feed() {
  const { userName, setUserName } = useUser();
  const { posts, setPosts, addPost, clearPosts } = useFeed();
  const { communities, setCommunities } = useCommunity();
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState<{ open: boolean; post: any | null }>({ open: false, post: null });
  const [editContent, setEditContent] = useState<string>("");
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; post: any | null }>({ open: false, post: null });
  const [selectedCommunity, setSelectedCommunity] = useState<string>("");
  const [postContent, setPostContent] = useState<string>("");

  // 初回: localStorageからユーザー名をReduxへ
  useEffect(() => {
    const storedUser = localStorage.getItem("userName");
    setUserName(storedUser || "");
  }, [setUserName]);

  // コミュニティ一覧取得
  useEffect(() => {
    fetch("/api/communities")
      .then((res) => res.json())
      .then((data) => setCommunities(data));
  }, [setCommunities]);

  // フィード取得
  useEffect(() => {
    if (!userName) return;
    setLoading(true);
    fetch(`/api/feed?user=${userName}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, [userName, setPosts]);

  const handleLike = async (postId: string) => {
    await fetch(`/api/posts/_id/like?id=${postId}`, { method: "POST" });
    setPosts((prev) => prev.map((p) => p.id === postId ? { ...p, likes: (p.likes || 0) + 1 } : p));
  };
  const handleReport = async (postId: string) => {
    await fetch(`/api/posts/_id/report?id=${postId}`, { method: "POST" });
    setPosts((prev: any[]) => prev.map((p) => p.id === postId ? { ...p, reports: (p.reports || 0) + 1 } : p));
  };


  // 編集モーダルオープン
  const handleEditOpen = (post: any) => {
    setEditModal({ open: true, post });
    setEditContent(post.content);
  };
  const handleEditClose = () => {
    setEditModal({ open: false, post: null });
    setEditContent("");
  };
  const handleEditSave = async () => {
    if (!editModal.post) return;
    await fetch(`/api/posts/_id/edit?id=${editModal.post.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: editContent }),
    });
    setPosts((prev: Post[]) => prev.map((p) => p.id === editModal.post.id ? { ...p, content: editContent } : p));
    handleEditClose();
  };
  // 削除ダイアログオープン
  const handleDeleteOpen = (post: any) => {
    setDeleteDialog({ open: true, post });
  };
  const handleDeleteClose = () => {
    setDeleteDialog({ open: false, post: null });
  };
  const handleDeleteConfirm = async () => {
    if (!deleteDialog.post) return;
    await fetch(`/api/posts/_id/edit?id=${deleteDialog.post.id}`, { method: "DELETE" });
    setPosts((prev: Post[]) => prev.filter((p) => p.id !== deleteDialog.post.id));
    handleDeleteClose();
  };

  return (
    <Box maxWidth={700} mx="auto" mt={4}>
      <Typography variant="h4" fontWeight={700} color="primary.main" gutterBottom>
        フィード
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        参加しているコミュニティの最新投稿をまとめてチェックできます。
      </Typography>
      {/* 投稿フォーム */}
      <Card sx={{ mb: 3, mt: 2 }}>
        <CardContent>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            新規投稿
          </Typography>
          <Box component="form" sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}
            onSubmit={async (e: React.FormEvent) => {
              e.preventDefault();
              if (!selectedCommunity || !postContent) return;
              await fetch(`/api/communities/${selectedCommunity}/posts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user, content: postContent }),
              });
              setPostContent("");
              setSelectedCommunity("");
              setLoading(true);
              fetch(`/api/feed?user=${user}`)
                .then((res) => res.json())
                .then((data) => {
                  setFeed(data);
                  setLoading(false);
                });
            }}>
            <TextField
              select
              label="コミュニティ選択"
              value={selectedCommunity}
              onChange={(e) => setSelectedCommunity(e.target.value)}
              sx={{ minWidth: 180 }}
              size="small"
            >
              {communities.map((c) => (
                <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
              ))}
            </TextField>
            <TextField
              label="投稿内容"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              sx={{ flex: 1, minWidth: 200 }}
              size="small"
            />
            <Button type="submit" variant="contained" color="primary" disabled={!selectedCommunity || !postContent}>
              投稿
            </Button>
          </Box>
        </CardContent>
      </Card>
      <Divider sx={{ my: 2 }} />
      {/* コミュニティごとにグループ化して表示 */}
      <List>
        {loading ? (
          Array.from({ length: 2 }).map((_, i) => (
            <Card key={i} sx={{ mb: 2 }}>
              <CardContent>
                <Skeleton variant="text" width={120} height={28} />
                <Skeleton variant="text" width={200} />
                <Skeleton variant="rectangular" width="100%" height={32} sx={{ my: 1 }} />
              </CardContent>
            </Card>
          ))
        ) : (Array.isArray(feed) && feed.length === 0) ? (
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
            投稿がありません。
          </Typography>
        ) : (
          // コミュニティごとにグループ化
          (
            Object.entries(
              (Array.isArray(feed) ? feed : []).reduce((acc: any, post: any) => {
                const cid = post.community?.id || post.communityId;
                if (!acc[cid]) acc[cid] = [];
                acc[cid].push(post);
                return acc;
              }, {})
            ) as [string, any[]][]
          ).map(([cid, posts]) => {
            const community = communities.find((c) => c.id === cid);
            return (
              <Box key={cid} sx={{ mb: 4 }}>
                <Typography variant="h6" fontWeight={700} color="primary" sx={{ mb: 1 }}>
                  {community ? community.name : `コミュニティID: ${cid}`}
                </Typography>
                {posts.map((post) => (
                  <Card key={post.id} elevation={2} sx={{ mb: 2 }}>
                    <CardContent>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Avatar sx={{ mr: 2 }}>{post.user[0]}</Avatar>
                        <Typography variant="subtitle1" fontWeight={600}>{post.user}</Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
                          {new Date(post.createdAt).toLocaleString()}
                        </Typography>
                      </Box>
                      <Typography variant="body1" sx={{ mb: 1 }}>{post.content}</Typography>
                      <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                        <Button size="small" color="primary" variant="outlined" onClick={() => handleLike(post.id)}>
                          いいね ({post.likes || 0})
                        </Button>
                        <Button size="small" color="error" variant="outlined" onClick={() => handleReport(post.id)}>
                          通報 ({post.reports || 0})
                        </Button>
                        {user === post.user && (
                          <>
                            <Button size="small" color="info" variant="outlined" onClick={() => handleEditOpen(post)}>
                              編集
                            </Button>
                            <Button size="small" color="warning" variant="outlined" onClick={() => handleDeleteOpen(post)}>
                              削除
                            </Button>
                          </>
                        )}
                      </Box>
                      <Typography variant="body2" color="secondary">
                        <Link href={`/community/${cid}`} legacyBehavior passHref>
                          <Button size="small" color="secondary" sx={{ textTransform: "none" }}>
                            {community ? community.name : `コミュニティID: ${cid}`} の投稿を見る
                          </Button>
                        </Link>
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            );
          })
        )}
      </List>

    {/* 編集モーダル */}
    <Dialog open={editModal.open} onClose={handleEditClose} maxWidth="sm" fullWidth>
      <DialogTitle>投稿を編集</DialogTitle>
      <DialogContent>
        <TextField
          multiline
          fullWidth
          minRows={3}
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditClose}>キャンセル</Button>
        <Button onClick={handleEditSave} variant="contained" color="primary">保存</Button>
      </DialogActions>
    </Dialog>
    {/* 削除ダイアログ */}
    <Dialog open={deleteDialog.open} onClose={handleDeleteClose}>
      <DialogTitle>投稿を削除しますか？</DialogTitle>
      <DialogActions>
        <Button onClick={handleDeleteClose}>キャンセル</Button>
        <Button onClick={handleDeleteConfirm} color="error" variant="contained">削除</Button>
      </DialogActions>
    </Dialog>
  </Box>
  );
}
