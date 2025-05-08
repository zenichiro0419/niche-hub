import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import NotificationList from '../components/NotificationList';
import CommunitySelector from '../components/CommunitySelector';

const AdminDashboard: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);

    return (
        <div className="admin-dashboard">
            <Header />
            <div className="dashboard-content">
                <Sidebar />
                <main>
                    <h1>Admin Dashboard</h1>
                    <p>Welcome, {user.username}!</p>
                    <CommunitySelector />
                    <NotificationList />
                    {/* Additional admin functionalities can be added here */}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;