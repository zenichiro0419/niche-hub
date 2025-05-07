/**
 * @file Sidebar.tsx
 * @brief サイドバーコンポーネント
 * @description コミュニティ切り替え・ナビゲーション用サイドバー。デスクトップは固定、モバイルはDrawer。Redux Toolkitで管理するコミュニティリストを表示。
 * @limitations バックエンド連携・詳細権限管理は未実装。UIのみ。
 */
import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  IconButton,
  useMediaQuery,
  Box,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { useNavigate, useLocation } from "react-router-dom";
import { setCurrentCommunityId } from "../store/communitySlice";

// ダミーコミュニティリスト（SelectCommunity.tsxと同じ構造）
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
    icon: "��️",
  },
];

/**
 * サイドバーの幅
 * @type {number}
 */
const drawerWidth = 240;

/**
 * サイドバーコンポーネント
 * @returns {JSX.Element} サイドバーUI
 */
const Sidebar: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const currentCommunityId = useSelector(
    (state: RootState) =>
      (state.community as { currentCommunityId: string }).currentCommunityId
  );

  // コミュニティメニュー用state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  // フィードボタン押下でメニュー表示
  const handleFeedClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleCommunitySelect = (id: string) => {
    dispatch(setCurrentCommunityId(id));
    setAnchorEl(null);
    navigate("/feed");
  };

  /**
   * ナビゲーションリスト
   * @type {{ label: string, icon: React.ReactNode, path: string }[]}
   */
  const navItems = [
    { label: "フィード", icon: <HomeIcon />, path: "/feed", isFeed: true },
    { label: "プロフィール", icon: <PersonIcon />, path: "/profile-edit" },
    { label: "通知", icon: <NotificationsIcon />, path: "/notifications" },
    { label: "管理者", icon: <AdminPanelSettingsIcon />, path: "/admin" },
  ];

  /**
   * サイドバー本体
   */
  const sidebarContent = (
    <Box sx={{ width: drawerWidth }} role="presentation">
      <Typography variant="h6" sx={{ p: 2, textAlign: "center" }}>
        NicheHub
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            {item.isFeed ? (
              <>
                <ListItemButton
                  onClick={handleFeedClick}
                  selected={location.pathname === item.path}
                  sx={{
                    "&.Mui-selected": {
                      bgcolor: "#eceff1",
                      color: "#5c6bc0",
                      fontWeight: "bold",
                    },
                    "&:hover": {
                      bgcolor: "#f0f4ff",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color:
                        location.pathname === item.path ? "#5c6bc0" : undefined,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
                <Menu
                  anchorEl={anchorEl}
                  open={menuOpen}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  transformOrigin={{ vertical: "top", horizontal: "left" }}
                >
                  {dummyCommunities.map((c) => (
                    <MenuItem
                      key={c.id}
                      selected={currentCommunityId === c.id}
                      onClick={() => handleCommunitySelect(c.id)}
                    >
                      <ListItemIcon>
                        <Avatar
                          sx={{
                            bgcolor: "#eceff1",
                            color: "#263238",
                            width: 24,
                            height: 24,
                          }}
                        >
                          {c.icon}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText primary={c.name} />
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <ListItemButton
                onClick={() => navigate(item.path)}
                selected={location.pathname === item.path}
                sx={{
                  "&.Mui-selected": {
                    bgcolor: "#eceff1",
                    color: "#5c6bc0",
                    fontWeight: "bold",
                  },
                  "&:hover": {
                    bgcolor: "#f0f4ff",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      location.pathname === item.path ? "#5c6bc0" : undefined,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            )}
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setOpen(true)}
            sx={{ m: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
            {sidebarContent}
          </Drawer>
        </>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          open
        >
          {sidebarContent}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
