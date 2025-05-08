import React from 'react';
import { useSelector } from 'react-redux';
import NotificationList from '../components/NotificationList';
import { RootState } from '../../store';

const Notifications: React.FC = () => {
    const notifications = useSelector((state: RootState) => state.notifications.items);

    return (
        <div className="notifications-page">
            <h1>Notifications</h1>
            {notifications.length > 0 ? (
                <NotificationList notifications={notifications} />
            ) : (
                <p>No notifications available.</p>
            )}
        </div>
    );
};

export default Notifications;