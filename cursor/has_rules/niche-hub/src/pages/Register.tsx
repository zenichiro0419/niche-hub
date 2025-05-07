/**
 * @file Register.tsx
 * @brief ユーザー登録画面コンポーネント
 * @description メールアドレス、ユーザー名、パスワード、利用規約同意のバリデーション付きフォーム。登録成功時はReduxに保存し、コミュニティ選択画面へ遷移。
 * @limitations バックエンド連携・実データ保存は未実装。UIのみ。
 */
import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  Alert,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

/**
 * @typedef {Object} RegisterFormInputs
 * @property {string} email - メールアドレス
 * @property {string} userName - ユーザー名
 * @property {string} password - パスワード
 * @property {boolean} terms - 利用規約同意
 */
type RegisterFormInputs = {
  email: string;
  userName: string;
  password: string;
  terms: boolean;
};

/**
 * ユーザー登録画面コンポーネント
 * @returns {JSX.Element} 登録フォームUI
 */
const Register: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  /**
   * フォーム送信時の処理
   * @param {RegisterFormInputs} data 入力データ
   */
  const onSubmit = (data: RegisterFormInputs) => {
    dispatch(setUser({ email: data.email, userName: data.userName }));
    navigate("/select-community");
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
            ユーザー登録
          </Typography>
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
                  InputProps={{
                    style: { background: "#fff", color: "#263238" },
                  }}
                />
              )}
            />
            <Controller
              name="userName"
              control={control}
              defaultValue=""
              rules={{ required: "ユーザー名は必須です" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="ユーザー名"
                  fullWidth
                  margin="normal"
                  error={!!errors.userName}
                  helperText={errors.userName?.message}
                  autoComplete="username"
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
                  autoComplete="new-password"
                  InputProps={{
                    style: { background: "#fff", color: "#263238" },
                  }}
                />
              )}
            />
            <Controller
              name="terms"
              control={control}
              defaultValue={false}
              rules={{ required: "利用規約への同意が必要です" }}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="利用規約に同意します"
                />
              )}
            />
            {errors.terms && (
              <Alert severity="error" sx={{ mb: 1 }}>
                {errors.terms.message}
              </Alert>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              登録
            </Button>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default Register;
