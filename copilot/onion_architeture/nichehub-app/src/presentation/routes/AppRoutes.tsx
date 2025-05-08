import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Community from '../pages/Community';
import Notifications from '../pages/Notifications';
import AdminDashboard from '../pages/AdminDashboard';

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/community" component={Community} />
                <Route path="/notifications" component={Notifications} />
                <Route path="/admin" component={AdminDashboard} />
            </Switch>
        </Router>
    );
};

export default AppRoutes;