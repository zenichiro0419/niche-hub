/**
 * アプリケーションルート
 * @description 主要ページのルーティングを管理
 */
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../presentation/pages/LoginPage";
import OnboardingPage from "../presentation/pages/OnboardingPage";
import FeedPage from "../presentation/pages/FeedPage";
import ProfilePage from "../presentation/pages/ProfilePage";
import { useSelector } from "react-redux";
import type { RootState } from "../presentation/store";
import Header from "../presentation/components/Header";
import { Box } from "@mui/material";

function App() {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  return (
    <BrowserRouter>
      <Header />
      <Box sx={{ pt: 8 }}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/"
            element={isLoggedIn ? <FeedPage /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
