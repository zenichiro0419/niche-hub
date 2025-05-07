/**
 * @file SelectCommunity.tsx
 * @brief コミュニティ選択画面コンポーネント
 * @description ダミーのコミュニティデータを表示し、最低1つ選択必須。選択状態はReduxで管理し、選択後はフィード画面へ遷移。
 * @limitations バックエンド連携・実データ保存は未実装。UIのみ。
 */
import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Checkbox,
  Avatar,
  Alert,
  Grid,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setSelectedCommunities } from "../store/communitySlice";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

/**
 * @typedef {Object} Community
 * @property {string} id - コミュニティID
 * @property {string} name - コミュニティ名
 * @property {string} description - 説明
 * @property {string} icon - アイコンURLまたは絵文字
 */
const dummyCommunities = [
  {
    id: "1",
    name: "プログラミング",
    description: "コードや技術の話題",
    icon: "💻",
  },
  { id: "2", name: "写真", description: "カメラ・写真好きの集い", icon: "📷" },
  { id: "3", name: "音楽", description: "音楽鑑賞・演奏", icon: "🎵" },
  { id: "4", name: "読書", description: "本・マンガ・小説", icon: "📚" },
  {
    id: "5",
    name: "アウトドア",
    description: "キャンプ・登山・釣り",
    icon: "🏕️",
  },
];

/**
 * コミュニティ選択画面コンポーネント
 * @returns {JSX.Element} コミュニティ選択UI
 */
const SelectCommunity: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  /**
   * コミュニティ選択のトグル
   * @param {string} id
   */
  const handleToggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  /**
   * フォーム送信時の処理
   * @param {React.FormEvent} e
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selected.length === 0) {
      setError("最低1つのコミュニティを選択してください");
      return;
    }
    dispatch(setSelectedCommunities(selected));
    navigate("/feed");
  };

  return (
    <Box display="flex" minHeight="100vh" bgcolor="#f5f6fa">
      {/* サイドバー */}
      <Sidebar />
      {/* メインコンテンツ */}
      <Box
        flex={1}
        sx={{ p: { xs: 1, sm: 3 }, maxWidth: 520, margin: "0 auto" }}
      >
        <Paper elevation={3} sx={{ p: 4, minWidth: 320, maxWidth: 520 }}>
          <Typography variant="h5" mb={2} align="center">
            コミュニティ選択
          </Typography>
          <Typography variant="body2" mb={2} align="center">
            興味のあるコミュニティを最低1つ選択してください。
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} mb={2}>
              {dummyCommunities.map((c) => (
                <Grid item xs={12} sm={6} key={c.id}>
                  <Paper
                    variant="outlined"
                    sx={{ p: 2, display: "flex", alignItems: "center" }}
                  >
                    <Checkbox
                      checked={selected.includes(c.id)}
                      onChange={() => handleToggle(c.id)}
                    />
                    <Avatar
                      sx={{ mr: 2, bgcolor: "#eceff1", color: "#263238" }}
                    >
                      {c.icon}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1">{c.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {c.description}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              決定
            </Button>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default SelectCommunity;
