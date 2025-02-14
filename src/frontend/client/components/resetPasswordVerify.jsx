import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import "../styles/SetPassword.css"


const ResetPassword = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
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

        if ( !phoneNumber) {
           window.alert(' phone number is required');
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

                // Redirect to the set password page with verified details
                navigate('/reset-password', { state: {phoneNumber } });
            };
        };
    };

    return (
        <div className='set-password-container'>
        <div className='set-password-wrapper'>
        <img src="/bb-logo.png" alt="logo" className='logo'/>
        <h2 >Please enter your phone number to verify</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className='labels'>Phone Number:</label>
                    <input
                        className='password'
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className='set-pass-btn'>Verify OTP</button>
            </form>
        
        <div className="pe_signin_button" data-client-id="17740259540984966105"></div>
        </div>
        </div>
    );
};

export default ResetPassword;
