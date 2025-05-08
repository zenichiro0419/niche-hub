import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Notification } from '../domain/entities/Notification';

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
}

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<Notification>) {
      state.notifications.push(action.payload);
      state.unreadCount += 1;
    },
    markAsRead(state, action: PayloadAction<number>) {
      const notificationIndex = state.notifications.findIndex(
        (notification) => notification.id === action.payload
      );
      if (notificationIndex !== -1) {
        state.notifications[notificationIndex].read = true;
        state.unreadCount -= 1;
      }
    },
    clearNotifications(state) {
      state.notifications = [];
      state.unreadCount = 0;
    },
  },
});

export const { addNotification, markAsRead, clearNotifications } = notificationSlice.actions;

export default notificationSlice.reducer;