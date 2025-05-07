/**
 * @file ProfileEdit.tsx
 * @brief プロフィール編集画面コンポーネント
 * @description ユーザー名・自己紹介・プロフィール画像の編集UI。Reduxに保存し/feedへ遷移。Material-UI利用。
 * @limitations バックエンド連携・実ファイル保存は未実装。画像はBase64で仮保存。
 */
import React, { useState } from "react";
import type { ChangeEvent } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
  Alert,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/userSlice";
import type { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import type { UserState } from "../store/userSlice";

/**
 * プロフィール編集画面コンポーネント
 * @returns {JSX.Element} プロフィール編集UI
 */
const ProfileEdit: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user) as UserState;
  const [userName, setUserName] = useState(user.userName || "");
  const [bio, setBio] = useState(user.bio || "");
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [avatarError, setAvatarError] = useState("");

  /**
   * 画像ファイル選択時の処理
   * @param {ChangeEvent<HTMLInputElement>} e
   */
  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // ファイルサイズ上限2MB
    if (file.size > 2 * 1024 * 1024) {
      setAvatarError("画像サイズは2MB以下にしてください");
      return;
    }
    // 画像形式チェック
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setAvatarError("JPEG/PNG/WebP形式の画像のみ対応しています");
      return;
    }
    setAvatarError("");
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  /**
   * フォーム送信時の処理
   * @param {React.FormEvent} e
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) {
      setError("ユーザー名は必須です");
      setSuccess("");
      return;
    }
    if (userName.length > 20) {
      setError("ユーザー名は20文字以内で入力してください");
      setSuccess("");
      return;
    }
    setError("");
    dispatch(setUser({ userName, bio, avatarUrl }));
    setSuccess("プロフィールを保存しました");
    setTimeout(() => {
      navigate("/feed");
    }, 1000);
  };

  return (
    <Box display="flex" minHeight="100vh" bgcolor="#f5f6fa">
      {/* サイドバー */}
      <Sidebar />
      {/* メインコンテンツ */}
      <Box
        flex={1}
        sx={{ p: { xs: 1, sm: 3 }, maxWidth: 520, margin: "0 auto" }}
      >
        <Paper elevation={3} sx={{ p: 4, minWidth: 320 }}>
          <Typography variant="h5" mb={2} align="center">
            プロフィール編集
          </Typography>
          <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
            <Avatar src={avatarUrl} sx={{ width: 80, height: 80, mb: 1 }}>
              {!avatarUrl && user.userName ? user.userName[0] : null}
            </Avatar>
            <input
              accept="image/*"
              id="avatar-upload"
              type="file"
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
            <label htmlFor="avatar-upload">
              <IconButton
                color="primary"
                component="span"
                aria-label="画像をアップロード"
              >
                <PhotoCamera />
              </IconButton>
            </label>
            {avatarError && (
              <Alert severity="error" sx={{ mt: 1, mb: 0 }}>
                {avatarError}
              </Alert>
            )}
          </Box>
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              label="ユーザー名"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              fullWidth
              margin="normal"
              required
              error={!!error}
              helperText={error}
              autoComplete="username"
            />
            <TextField
              label="自己紹介"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              fullWidth
              margin="normal"
              multiline
              minRows={3}
              autoComplete="off"
            />
            {success && (
              <Alert severity="success" sx={{ mt: 2 }}>
                {success}
              </Alert>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              保存
            </Button>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default ProfileEdit;
