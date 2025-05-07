import { Box, Button, TextField, Typography, Card, CardContent } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";

type FormData = { email: string; username: string; password: string };

export default function Register() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormData>();
  const [message, setMessage] = useState("");
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setMessage("登録成功! トップページへ移動します");
      localStorage.setItem("userName", data.username);
      setTimeout(() => router.push("/"), 1000);
    } else {
      setMessage("登録失敗");
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={10}>
      <Card elevation={4}>
        <CardContent>
          <Typography variant="h5" gutterBottom fontWeight={700} color="primary.main">新規登録</Typography>
          <Typography variant="body2" color="text.secondary">
            現在はダミー登録APIです。下記の値で登録できます：
          </Typography>
          <Typography variant="body2">
            メールアドレス: <b>dummy@example.com</b><br/>
            ユーザー名: <b>dummyuser</b><br/>
            パスワード: <b>password123</b>
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="ユーザー名"
              fullWidth
              margin="normal"
              {...register("username", { required: true })}
            />
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
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting} sx={{ mt: 2 }}>
              登録
            </Button>
          </form>
          {message && (
            <Typography color="error" sx={{ mt: 2 }}>{message}</Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
