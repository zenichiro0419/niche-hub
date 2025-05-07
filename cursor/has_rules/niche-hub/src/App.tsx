/**
 * @file App.tsx
 * @brief アプリケーションのルーティング設定
 * @description アプリ起動時（初回アクセス時）は必ずログイン画面（/login）に遷移する。ユーザー登録（/register）、コミュニティ選択（/select-community）もルーティング追加。
 * @limitations 認証状態管理は未実装。UI遷移のみ。
 */
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Register from "./pages/Register";
import ProfileEdit from "./pages/ProfileEdit";
import "./App.css";

/**
 * アプリケーションのルーティングコンポーネント
 * @returns {JSX.Element} ルーティングUI
 */
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile-edit" element={<ProfileEdit />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
