/**
 * セカンダリーボタンコンポーネント
 * @description アプリ全体で使用するアウトライン・角丸・ホバー効果統一のボタン
 */
import React from "react";
import { Button, ButtonProps } from "@mui/material";

const SecondaryButton: React.FC<ButtonProps> = (props) => (
  <Button
    variant="outlined"
    color="primary"
    sx={{
      borderRadius: 2,
      textTransform: "none",
      fontWeight: "bold",
      borderColor: "#5c6bc0",
      color: "#5c6bc0",
      "&:hover": { borderColor: "#4db6ac", color: "#4db6ac" },
    }}
    {...props}
  />
);

export default SecondaryButton;
