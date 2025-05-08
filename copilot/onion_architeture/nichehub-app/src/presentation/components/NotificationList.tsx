import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Notification } from '../../domain/entities/Notification';

const NotificationList: React.FC = () => {
    const notifications: Notification[] = useSelector((state: RootState) => state.notification.notifications);

    return (
        <div className="notification-list">
            <h2>Notifications</h2>
            {notifications.length === 0 ? (
                <p>No notifications available.</p>
            ) : (
                <ul>
                    {notifications.map((notification) => (
                        <li key={notification.id}>
                            <p>{notification.message}</p>
                            <span>{new Date(notification.timestamp).toLocaleString()}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NotificationList;