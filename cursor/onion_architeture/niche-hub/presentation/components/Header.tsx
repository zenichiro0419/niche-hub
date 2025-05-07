/**
 * ヘッダーコンポーネント
 * @description 全ページ共通の固定ヘッダー。ロゴ、ナビゲーション、プロフィールメニューを表示。
 */
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={1}
      sx={{ bgcolor: "#eceff1", color: "#263238" }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ flexGrow: 1, cursor: "pointer", color: "#263238" }}
          onClick={() => navigate("/")}
        >
          NicheHub
        </Typography>
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          <Button
            color="inherit"
            sx={{ color: "#263238" }}
            onClick={() => navigate("/")}
          >
            フィード
          </Button>
          <Button
            color="inherit"
            sx={{ color: "#263238" }}
            onClick={() => navigate("/profile")}
          >
            プロフィール
          </Button>
        </Box>
        {currentUser && (
          <>
            <IconButton onClick={handleMenu} sx={{ ml: 2 }}>
              <Avatar
                src={currentUser.profileImageUrl}
                alt={currentUser.userName}
              />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/profile");
                }}
                sx={{ color: "#263238" }}
              >
                プロフィール
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/login");
                }}
                sx={{ color: "#263238" }}
              >
                ログアウト
              </MenuItem>
            </Menu>
          </>
        )}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
