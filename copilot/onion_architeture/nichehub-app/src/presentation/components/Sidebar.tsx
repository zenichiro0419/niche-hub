import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <aside className="sidebar">
            <h2>Navigation</h2>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/community">Communities</Link>
                </li>
                <li>
                    <Link to="/notifications">Notifications</Link>
                </li>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
                <li>
                    <Link to="/admin">Admin Dashboard</Link>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;