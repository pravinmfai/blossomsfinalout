import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import "../styles/signup.css";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    // const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize the navigate function for redirection

    useEffect(() => {
        // Cleanup script on component unmount
        return () => {
            const script = document.querySelector('script[src="https://www.phone.email/sign_in_button_v1.js"]');
            if (script) {
                script.remove();
            }
            window.phoneEmailListener = null;
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!email || !phoneNumber) {
            window.alert("Both email and password are required");
            return;
        }
    
        // Load the external script for phone and email verification
        const script = document.createElement('script');
        script.src = "https://www.phone.email/sign_in_button_v1.js";
        script.async = true;
        document.querySelector('.pe_signin_button').appendChild(script);
    
        // Once the script is loaded, trigger the verification
        script.onload = () => {
            window.phoneEmailListener = function(userObj) {
                const user_json_url = userObj.user_json_url;
    
                navigate('/set-password', { state: { email, phoneNumber,user_json_url } });
            };
        };
    };
    

    return (
        <div className='signup-container'>
            <div className='signup-wrapper'>
                <img src="/bb-logo.png" alt="logo" className='logo'/>

            <h2>Welcome to Blossom Boutique!</h2>
            <p>Please enter your email and phone number to continue.</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className='labels'>Email</label>
                    <br />
                    <input className='email'
                        type="email"
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className='labels'>Phone Number</label>
                    <br />
                    <input className='phone'
                        placeholder='Enter your phone number'
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>
                <button className="verify-btn"type="submit">Verify OTP</button>
            </form>
            <div className="pe_signin_button sign-btn" data-client-id="17740259540984966105"></div>
            </div>
        </div>
    );
};

export default SignUp;
