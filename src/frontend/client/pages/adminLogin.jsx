import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import "../styles/login.css"

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send login request to backend
            const response = await axios.post('https://blossomsfinalout.onrender.com/api/admin/login', { email, password });

            if (response.status === 200) {
                // Successful login, redirect to admin dashboard
                localStorage.setItem('adminToken', response.data.token);

                navigate('/admin-dashboard');
            } else {
                // Handle other status codes, if necessary
                window.alert("Unexpected Response Status Code")
            }
        } catch (err) {
            window.alert("Invalid email or password")
        }
    };

    return (
        <div className='login-container'>
            <div className='login-wrapper'>
            <img src="/bb-logo.png" alt="logo" className='logo'/>
            <h2>Admin Login</h2>
            <p>Please enter your email and password to continue.</p>
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label className='labels'>Email:</label>
                    <input
                        className='emailorphone'
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='pass-container'>
                    <label className='labels'>Password:</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        className='login-pass'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                      <button
          type="button"
          className='password-view'
          onClick={togglePasswordVisibility}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            outline: 'none',
          }}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
                </div>
                <button type="submit" className='login-btn'>Login</button>
            </form>
            </div>
        </div>
    );
};

export default AdminLogin;
