/**
 * 通知管理用Redux slice
 *
 * @概要
 *   - 通知情報を管理する。
 *   - 初期値はダミー通知。
 */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Notification } from "../types";
import { dummyNotifications } from "../features/notification/functions/dummyNotifications";

export type NotificationState = {
  notifications: Notification[];
};

const initialState: NotificationState = {
  notifications: dummyNotifications,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<Notification>) {
      state.notifications.unshift(action.payload);
    },
    markAsRead(state, action: PayloadAction<string>) {
      const notification = state.notifications.find(
        (n: Notification) => n.id === action.payload
      );
      if (notification) notification.isRead = true;
    },
    markAllAsRead(state) {
      state.notifications.forEach((n) => {
        n.isRead = true;
      });
    },
  },
});

export const { addNotification, markAsRead, markAllAsRead } =
  notificationSlice.actions;
export default notificationSlice.reducer;
