import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('adminToken'); // Check if token is available

    if (!token) {
        return <Navigate to="/admin-login" />;
    }

    return children;
};

export default ProtectedRoute;
