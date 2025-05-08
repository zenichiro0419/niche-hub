import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './presentation/routes/AppRoutes';
import './index.css';
import Header from './presentation/components/Header';
import Sidebar from './presentation/components/Sidebar';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="main-content">
          <Sidebar />
          <AppRoutes />
        </div>
      </div>
    </Router>
  );
};

export default App;