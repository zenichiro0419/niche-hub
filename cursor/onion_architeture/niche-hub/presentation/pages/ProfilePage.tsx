/**
 * プロフィール編集ページ
 * @description ユーザーのプロフィール編集フォームを表示
 */
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Avatar,
  Alert,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { updateProfile } from "../userSlice";

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [userName, setUserName] = useState(currentUser?.userName || "");
  const [bio, setBio] = useState(currentUser?.bio || "");
  const [profileImageUrl, setProfileImageUrl] = useState(
    currentUser?.profileImageUrl || ""
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!currentUser) {
    return (
      <Container sx={{ mt: 8 }}>
        <Typography>ログインしてください。</Typography>
      </Container>
    );
  }

  const handleSave = () => {
    setError("");
    setSuccess("");
    if (!userName.trim()) {
      setError("ユーザー名は必須です。");
      return;
    }
    dispatch(updateProfile({ userName, bio, profileImageUrl }));
    setSuccess("プロフィールを更新しました。");
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        プロフィール編集
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Avatar src={profileImageUrl} sx={{ width: 80, height: 80, mb: 2 }} />
        <TextField
          label="プロフィール画像URL"
          fullWidth
          value={profileImageUrl}
          onChange={(e) => setProfileImageUrl(e.target.value)}
          sx={{ mb: 2 }}
        />
      </Box>
      <TextField
        label="ユーザー名"
        fullWidth
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="自己紹介"
        fullWidth
        multiline
        rows={3}
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSave}
      >
        保存
      </Button>
    </Container>
  );
};

export default ProfilePage;
