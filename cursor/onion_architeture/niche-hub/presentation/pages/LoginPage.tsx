/**
 * ログイン・新規登録ページ
 * @description ユーザーのログイン・新規登録フォームを表示
 */
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Tab,
  Tabs,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login as loginAction } from "../userSlice";
import { DummyUserRepository } from "../../infrastructure/repository";
import { registerUser, loginUser } from "../../application/userUseCase";
import { useNavigate } from "react-router-dom";

/** フォーム入力型 */
type LoginForm = {
  email: string;
  password: string;
};
type RegisterForm = {
  userName: string;
  email: string;
  password: string;
};

const userRepository = new DummyUserRepository();

const LoginPage: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ログインフォーム
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginForm>();

  // 新規登録フォーム
  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
  } = useForm<RegisterForm>();

  /** ログイン処理 */
  const onLogin = (data: LoginForm) => {
    setError("");
    const user = loginUser(userRepository, data.email, data.password);
    if (user) {
      dispatch(loginAction(user));
      // コミュニティ未選択ならオンボーディングへ
      if (!user.communityIds || user.communityIds.length === 0) {
        navigate("/onboarding");
      } else {
        navigate("/");
      }
    } else {
      setError("メールアドレスまたはパスワードが正しくありません。");
    }
  };

  /** 新規登録処理 */
  const onRegister = (data: RegisterForm) => {
    setError("");
    try {
      const user = registerUser(
        userRepository,
        data.userName,
        data.email,
        data.password
      );
      dispatch(loginAction(user));
      navigate("/onboarding");
    } catch {
      setError("登録に失敗しました。入力内容をご確認ください。");
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ mb: 3, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" sx={{ color: "#263238" }}>
          NicheHub
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "#263238" }}>
          趣味・専門分野のクローズドSNS
        </Typography>
      </Box>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} centered>
        <Tab label="ログイン" />
        <Tab label="新規登録" />
      </Tabs>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      {tab === 0 && (
        <Box
          component="form"
          onSubmit={handleLoginSubmit(onLogin)}
          sx={{ mt: 2 }}
        >
          <TextField
            label="メールアドレス"
            fullWidth
            margin="normal"
            {...loginRegister("email", {
              required: "メールアドレスは必須です",
            })}
            error={!!loginErrors.email}
            helperText={loginErrors.email?.message}
          />
          <TextField
            label="パスワード"
            type="password"
            fullWidth
            margin="normal"
            {...loginRegister("password", { required: "パスワードは必須です" })}
            error={!!loginErrors.password}
            helperText={loginErrors.password?.message}
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
        </Box>
      )}
      {tab === 1 && (
        <Box
          component="form"
          onSubmit={handleRegisterSubmit(onRegister)}
          sx={{ mt: 2 }}
        >
          <TextField
            label="ユーザー名"
            fullWidth
            margin="normal"
            {...registerRegister("userName", {
              required: "ユーザー名は必須です",
            })}
            error={!!registerErrors.userName}
            helperText={registerErrors.userName?.message}
          />
          <TextField
            label="メールアドレス"
            fullWidth
            margin="normal"
            {...registerRegister("email", {
              required: "メールアドレスは必須です",
            })}
            error={!!registerErrors.email}
            helperText={registerErrors.email?.message}
          />
          <TextField
            label="パスワード"
            type="password"
            fullWidth
            margin="normal"
            {...registerRegister("password", {
              required: "パスワードは必須です",
              minLength: { value: 6, message: "6文字以上で入力してください" },
            })}
            error={!!registerErrors.password}
            helperText={registerErrors.password?.message}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            新規登録
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default LoginPage;
