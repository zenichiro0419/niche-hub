/**
 * コミュニティ選択ページ
 * @description 初回ログイン時のコミュニティ選択UI
 */
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Typography,
  Alert,
  Paper,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { selectCommunities as selectCommunitiesAction } from "../userSlice";
import {
  DummyCommunityRepository,
  DummyUserRepository,
} from "../../infrastructure/repository";
import { selectCommunities } from "../../application/userUseCase";
import { useNavigate } from "react-router-dom";

const communityRepository = new DummyCommunityRepository();
const userRepository = new DummyUserRepository();

const OnboardingPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [selected, setSelected] = useState<string[]>(
    currentUser?.communityIds ?? []
  );
  const [error, setError] = useState("");

  const communities = communityRepository.findAll();

  const handleToggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    setError("");
    if (selected.length === 0) {
      setError("最低1つのコミュニティを選択してください。");
      return;
    }
    if (!currentUser) {
      setError("ユーザー情報が取得できません。再度ログインしてください。");
      return;
    }
    // ユースケースで更新
    const updatedUser = selectCommunities(currentUser, selected);
    userRepository.create(updatedUser); // ダミーリポジトリに反映
    dispatch(selectCommunitiesAction(selected));
    navigate("/");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        興味のあるコミュニティを選択してください
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        ※最低1つ選択必須。後から追加・変更も可能です。
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Grid container spacing={2}>
        {communities.map((c) => (
          <Grid item xs={12} sm={6} md={4} key={c.id}>
            <Paper
              sx={{ p: 2, display: "flex", alignItems: "center" }}
              variant={selected.includes(c.id) ? "outlined" : "elevation"}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selected.includes(c.id)}
                    onChange={() => handleToggle(c.id)}
                  />
                }
                label={
                  <Box>
                    <Typography fontWeight="bold">{c.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {c.description}
                    </Typography>
                  </Box>
                }
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 4 }}
        onClick={handleSave}
      >
        保存してはじめる
      </Button>
    </Container>
  );
};

export default OnboardingPage;
