/**
 * AppLayout コンポーネント
 *
 * @概要
 *   - アプリ全体の共通レイアウト（ヘッダー・サイドバー・メインコンテンツ）
 *
 * @主な仕様
 *   - Material-UIのBox/Containerを利用
 *   - ヘッダー・サイドバー・メインを分離
 */
import React, { ReactNode } from "react";
import Box from "@mui/material/Box";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => (
  <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
    <Header />
    <Box sx={{ display: "flex", flex: 1 }}>
      <Sidebar />
      <Box component="main" sx={{ flex: 1, p: 2 }}>
        {children}
      </Box>
    </Box>
  </Box>
);

export default AppLayout;
