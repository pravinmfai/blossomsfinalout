import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import "../styles/SetPassword.css"
import imglogo from "../assest/bb-logo.png"

const SetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const { email, phoneNumber, user_json_url } = location.state || {};

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
              window.alert("password doesn't match")
            return;
        }
       
        console.log("Response-");
        // Make a single POST request to the new combined route
        axios.post('https://blossomsfinalout.onrender.com/api/auth/register', { user_json_url, email, phoneNumber, password })
            .then(response => {
                const { data } = response;
                if (data.error) {
                    window.alert(data.error)
                } else {
                    // Redirect to dashboard after successful signup
                    navigate('/login');
                }
            })
            .catch(err => {
                window.alert(err.response.data.error);
            });
    };

    return (
        <div className='set-password-container'>
            <div className='set-password-wrapper'>
            <img src={imglogo} alt="logo" className='logo'/>
            <h2>Set Password</h2>
            <form onSubmit={handleSubmit}>
                <div className='set-pass-container'>
                    <label className='labels'>Password:</label>
                    <input
                        placeholder='Enter your password'
                        className='password'
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                     type='button'
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
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button
                    type='button'
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

export default SetPassword;
