/**
 * サイドバーコンポーネント
 * @description 所属コミュニティ一覧を表示し、選択中コミュニティをハイライト。デスクトップのみ表示。
 */
import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { selectCommunity } from "../communitySlice";

const drawerWidth = 220;

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const allCommunities = useSelector(
    (state: RootState) => state.community.communities
  );
  const selectedCommunityId = useSelector(
    (state: RootState) => state.community.selectedCommunityId
  );
  const userCommunities = allCommunities.filter((c) =>
    currentUser?.communityIds.includes(c.id)
  );

  if (!currentUser) return null;

  return (
    <Box sx={{ display: { xs: "none", md: "block" } }}>
      <Drawer
        variant="persistent"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#eceff1",
            borderRight: "1px solid #ddd",
            pt: 8,
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", px: 2, mb: 2 }}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ flexGrow: 1 }}
          >
            コミュニティ
          </Typography>
          <IconButton onClick={() => setOpen(false)} size="small">
            <ChevronLeftIcon />
          </IconButton>
        </Box>
        <List>
          {userCommunities.map((c) => (
            <ListItem key={c.id} disablePadding>
              <ListItemButton
                selected={selectedCommunityId === c.id}
                onClick={() => dispatch(selectCommunity(c.id))}
              >
                <ListItemIcon>
                  <GroupIcon
                    color={selectedCommunityId === c.id ? "primary" : "inherit"}
                  />
                </ListItemIcon>
                <ListItemText primary={c.name} secondary={c.description} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      {!open && (
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            position: "fixed",
            top: 80,
            left: 8,
            zIndex: 1201,
            bgcolor: "#eceff1",
            border: "1px solid #ddd",
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default Sidebar;
