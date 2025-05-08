/**
 * Header コンポーネント
 *
 * @概要
 *   - アプリ全体のヘッダー（アプリ名・ナビゲーション）
 */
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";

const Header: React.FC = () => (
  <AppBar position="static" color="primary">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        NicheHub
      </Typography>
      {/* ナビゲーションやプロフィールメニュー等をここに追加 */}
    </Toolbar>
  </AppBar>
);

export default Header;
