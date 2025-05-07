import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";
import { useUser } from "../shared/useUser";

type FormData = { email: string; password: string };

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>();
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { setUserName } = useUser();

  const onSubmit = async (data: FormData) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      localStorage.setItem("userName", data.email || "");
      setUserName(data.email || "");
      setMessage("ログイン成功!");
      setTimeout(() => router.push("/communities"), 1000);
    } else {
      setMessage("ログイン失敗");
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={10}>
      <Card elevation={4}>
        <CardContent>
          <Typography
            variant="h5"
            gutterBottom
            fontWeight={700}
            color="primary.main"
          >
            ログイン
          </Typography>
          <Typography variant="body2" color="text.secondary">
            現在はダミーログインAPIです。下記の値でログインできます：
          </Typography>
          <Typography variant="body2">
            メールアドレス: <b>dummy@example.com</b>
            <br />
            パスワード: <b>password123</b>
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="メールアドレス"
              fullWidth
              margin="normal"
              {...register("email", { required: true })}
            />
            <TextField
              label="パスワード"
              type="password"
              fullWidth
              margin="normal"
              {...register("password", { required: true })}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting}
              sx={{ mt: 2 }}
            >
              ログイン
            </Button>
          </form>
          {message && (
            <Typography color="error" sx={{ mt: 2 }}>
              {message}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
