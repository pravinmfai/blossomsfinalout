import React, { useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/login.css"

const Login = () => {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

     // Function to toggle the visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!emailOrPhone || !password) {
            window.alert("Both the fields are required")
            return;
        }

        // Send login request to the backend
        axios.post('http://localhost:5000/api/auth/login', { emailOrPhone, password })
            .then(response => {
                const { data } = response;
                console.log(response.data.user);
                localStorage.setItem("userId",response.data.user._id);
                localStorage.setItem("userEmail",response.data.user.name);
                localStorage.setItem("userPhone",response.data.user.phoneNumber);
            //    window.alert(data);
                if (data.error) {
                    window.alert(data.error)
                } else {
                    // Successful login, redirect to dashboard or home
                    // localStorage.setItem('userDetails', data);
                    navigate('/dashboard');
                }
            })
            .catch(err => {
                console.log(err);
                window.alert(err.response.data.error);
            });
    };

    return (
        <div className='login-container'>
            <div className='login-wrapper'>
            <img src="../assest/bb-logo.png" alt="logo" className='logo'/>
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
