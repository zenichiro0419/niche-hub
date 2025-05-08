import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="bg-primary text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">NicheHub</h1>
            <nav>
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/" className="hover:underline">Home</Link>
                    </li>
                    <li>
                        <Link to="/community" className="hover:underline">Community</Link>
                    </li>
                    <li>
                        <Link to="/notifications" className="hover:underline">Notifications</Link>
                    </li>
                    <li>
                        <Link to="/login" className="hover:underline">Login</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;