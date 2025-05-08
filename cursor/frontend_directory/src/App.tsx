/**
 * Appコンポーネント
 *
 * @概要
 *   - ルーティング（React Router v6）
 *   - ダーク/ライトテーマ切替
 *   - AppLayoutで全体をラップ
 *   - 各機能のUI雛形ページを配置
 */
import React, { useState, useMemo } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import { getTheme } from "./theme";
import { ThemeProvider, CssBaseline, useMediaQuery } from "@mui/material";

const Home = () => <div>ホーム（フィード）</div>;
const Community = () => <div>コミュニティ選択</div>;
const Profile = () => <div>プロフィール編集</div>;
const Notification = () => <div>通知一覧</div>;
const Admin = () => <div>管理者ダッシュボード</div>;
const Login = () => <div>ログイン/新規登録</div>;

const App: React.FC = () => {
  // システムのダークモード設定を初期値に
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<"light" | "dark">(
    prefersDarkMode ? "dark" : "light"
  );
  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleTheme = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppLayout>
          {/* テーマ切替ボタン（仮配置） */}
          <button
            onClick={toggleTheme}
            style={{ position: "fixed", top: 16, right: 16, zIndex: 2000 }}
          >
            {mode === "light" ? "ダークモード" : "ライトモード"}
          </button>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/community" element={<Community />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
