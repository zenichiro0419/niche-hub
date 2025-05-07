/**
 * プライマリーボタンコンポーネント
 * @description アプリ全体で使用する配色・角丸・ホバー効果統一のボタン
 */
import React from "react";
import { Button, ButtonProps } from "@mui/material";

const PrimaryButton: React.FC<ButtonProps> = (props) => (
  <Button
    variant="contained"
    color="primary"
    sx={{
      borderRadius: 2,
      boxShadow: "none",
      textTransform: "none",
      fontWeight: "bold",
      bgcolor: "#5c6bc0",
      "&:hover": { bgcolor: "#4db6ac" },
    }}
    {...props}
  />
);

export default PrimaryButton;
