import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/login.css";

const Login = () => {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // 🔹 Check if user is already logged in when the component loads
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate('/user'); // Redirect to user page if already logged in
        }
    }, [navigate]);

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!emailOrPhone.trim() || !password) {
            window.alert("Both fields are required");
            return;
        }

        try {
            const isEmail = emailOrPhone.includes('@');
            const loginData = isEmail
                ? { email: emailOrPhone.trim(), password }
                : { phone: emailOrPhone.trim(), password };

            const response = await axios.post("http://localhost:5000/api/auth/login", loginData);

            if (response.data.error) {
                window.alert(response.data.error);
            } else {
                const { user, token } = response.data;
                localStorage.setItem("token", token);
                navigate('/user'); // Redirect to user page after login
            }
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.error || err.message || "Login failed. Please try again.";
            window.alert(errorMessage);
        }
    };

    return (
        <div className='login-container'>
            <div className='login-wrapper'>
                <img src="../assest/bb-logo.png" alt="logo" className='logo' />
                <h2>Welcome to Blossom Boutique!</h2>
                <p>Please enter your email and password to continue.</p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='labels'>Email or Phone Number:</label><br />
                        <input
                            className='emailorphone'
                            placeholder='Enter your email/phone number'
                            type="text"
                            value={emailOrPhone}
                            onChange={(e) => setEmailOrPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div className='pass-container'>
                        <label className='labels'>Password:</label>
                        <input
                            placeholder='Enter your password'
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
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        <p className='forgot-pass'>
                            <Link to="/reset-verify" className='forgot-pass'>Forgot Password?</Link>
                        </p>
                    </div>
                    <button type="submit" className='login-btn'>Login</button>
                </form>
                <p className='bottom-text'>
                    Don't have an account? <Link to="/signup" className='signup-footer-link'>Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
