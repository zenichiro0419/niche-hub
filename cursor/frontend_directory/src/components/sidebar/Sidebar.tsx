/**
 * Sidebar コンポーネント
 *
 * @概要
 *   - アプリ全体のサイドバー（コミュニティリスト等）
 */
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import React from "react";

const Sidebar: React.FC = () => (
  <Drawer
    variant="permanent"
    sx={{
      width: 240,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
    }}
  >
    <List>
      {/* コミュニティリストのダミー表示 */}
      <ListItem component="button">
        <ListItemText primary="コミュニティ1" />
      </ListItem>
      <ListItem component="button">
        <ListItemText primary="コミュニティ2" />
      </ListItem>
      <ListItem component="button">
        <ListItemText primary="コミュニティ3" />
      </ListItem>
    </List>
  </Drawer>
);

export default Sidebar;
