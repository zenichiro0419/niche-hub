/**
 * PostForm コンポーネント
 *
 * @概要
 *   - 投稿作成用のフォームUIコンポーネント。
 *
 * @主な仕様
 *   - 280文字制限・バリデーション
 *   - React Hook Formを利用
 *   - 送信時にonSubmitコールバックを呼ぶ
 */
import React from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface PostFormProps {
  onSubmit: (content: string) => void;
  loading?: boolean;
}

interface FormValues {
  content: string;
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit, loading }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { content: "" },
  });

  const submit = (data: FormValues) => {
    onSubmit(data.content);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Controller
        name="content"
        control={control}
        rules={{
          required: "本文は必須です",
          maxLength: { value: 280, message: "280文字以内で入力してください" },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="投稿内容"
            multiline
            fullWidth
            minRows={2}
            maxRows={6}
            error={!!errors.content}
            helperText={errors.content?.message}
            inputProps={{ maxLength: 280 }}
            sx={{ mb: 2 }}
          />
        )}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
      >
        投稿する
      </Button>
    </form>
  );
};

export default PostForm;
