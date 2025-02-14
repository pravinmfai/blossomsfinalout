import React from 'react';
import {useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin-login');
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <nav>
                <ul>
                    <li>
                        <button onClick={handleLogout}>Logout</button>
                    </li>
                </ul>
            </nav>

            <div>
                <h2>Welcome, Admin!</h2>
                <p>This is your dashboard. You can manage users and create new admins from here.</p>
            </div>
        </div>
    );
};

export default AdminDashboard;
