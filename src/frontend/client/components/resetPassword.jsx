import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import "../styles/SetPassword.css"
import imglogo from "../assest/bb-logo.png";

const ResetPass = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const { phoneNumber  } = location.state || {};

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

      const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
      };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!password || !confirmPassword) {
            window.alert("Both the fields are required")
            return;
        }

        if (password !== confirmPassword) {
            window.alert("Passwords doesn't match")
            return;
        }
       

        // Make a single POST request to the new combined route
        axios.post('https://blossomsfinalout.onrender.com/api/auth/reset', { phoneNumber,password })
            .then(response => {
                const { data } = response;
                if (data.error) {
                    // window.alert(data.error)
                } else {
                    // Redirect to dashboard after successful signup
                    navigate('/');
                }
            })
            .catch(err => {
                // window.alert("An error occurred",err.message)
            });
    };

    return (
        <div className='set-password-container'>
        <div className='set-password-wrapper'>
        <img src={imglogo} alt="logo" className='logo'/>
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
            <div className='set-pass-container'>
                <label className='labels'>Password:</label>
                <input
                    placeholder='Enter your password'
                    className='password'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
       type={showPassword ? 'text' : 'password'}
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
            <div className='set-pass-container'>
                <label className='labels'>Confirm Password:</label>
                <input
                    placeholder='Confirm your password'
                    className='confirmPassword'
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button
       type={showConfirmPassword ? 'text' : 'password'}
      className='password-view'
      onClick={toggleConfirmPasswordVisibility}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        outline: 'none',
      }}
    >
      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
    </button>
            </div>
            <button type="submit" className='set-pass-btn'>Click to continue</button>
        </form>
        </div>
    </div>
    );
};

export default ResetPass;
