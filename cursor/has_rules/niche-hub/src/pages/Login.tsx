/**
 * @file Login.tsx
 * @brief ログイン画面コンポーネント
 * @description メールアドレスとパスワードによるログインフォーム。Material-UIとReact Hook Formを利用し、バリデーション（メール形式・パスワード長さ）を実装。認証処理は未実装。
 * @limitations バックエンド連携・認証処理は未実装。UIのみ。
 */
import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

/**
 * @typedef {Object} LoginFormInputs
 * @property {string} email - メールアドレス
 * @property {string} password - パスワード
 */
type LoginFormInputs = {
  email: string;
  password: string;
};

/**
 * ログイン画面コンポーネント
 * @returns {JSX.Element} ログインフォームUI
 */
const Login: React.FC = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  /**
   * フォーム送信時の処理（仮認証）
   * @param {LoginFormInputs} data 入力データ
   */
  const onSubmit = (data: LoginFormInputs) => {
    if (data.email === "test@example.com" && data.password === "password123") {
      navigate("/feed");
    } else {
      alert("ログインIDまたはパスワードが違います");
    }
  };

  return (
    <Box display="flex" minHeight="100vh" bgcolor="#f5f6fa">
      {/* サイドバー */}
      <Sidebar />
      {/* メインコンテンツ */}
      <Box
        flex={1}
        sx={{
          p: { xs: 1, sm: 3 },
          maxWidth: 520,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Paper elevation={3} sx={{ p: 4, minWidth: 320, width: "100%" }}>
          <Typography variant="h5" mb={2} align="center">
            NicheHub ログイン
          </Typography>
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              <strong>テスト用ログインID：</strong> test@example.com
              <br />
              <strong>パスワード：</strong> password123
            </Typography>
          </Alert>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "メールアドレスは必須です",
                pattern: {
                  value: /^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/,
                  message: "メールアドレスの形式が正しくありません",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="メールアドレス"
                  fullWidth
                  margin="normal"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  autoComplete="email"
                  variant="outlined"
                  InputProps={{
                    style: { background: "#fff", color: "#263238" },
                  }}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: "パスワードは必須です",
                minLength: {
                  value: 6,
                  message: "パスワードは6文字以上で入力してください",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="パスワード"
                  type="password"
                  fullWidth
                  margin="normal"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  autoComplete="current-password"
                  variant="outlined"
                  InputProps={{
                    style: { background: "#fff", color: "#263238" },
                  }}
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              ログイン
            </Button>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;
