import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/signup.css";
import imglogo from "../assest/bb-logo.png";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            const script = document.querySelector('script[src="https://www.phone.email/sign_in_button_v1.js"]');
            if (script) {
                script.remove();
            }
            window.phoneEmailListener = null;
        };
    }, []);

    // 🔥 Validation Function
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^[6-9]\d{9}$/; // 6-9 start & 10 digits irukkanum
        return phoneRegex.test(phone);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !phoneNumber) {
            window.alert("Please fill both email and phone number.");
            return;
        }

        if (!validateEmail(email)) {
            window.alert("Enter a valid email address.");
            return;
        }

        if (!validatePhone(phoneNumber)) {
            window.alert("Please enter a valid 10 digit Indian phone number.");
            return;
        }

        const script = document.createElement('script');
        script.src = "https://www.phone.email/sign_in_button_v1.js";
        script.async = true;
        document.querySelector('.pe_signin_button').appendChild(script);

        script.onload = () => {
            window.phoneEmailListener = function(userObj) {
                const user_json_url = userObj.user_json_url;
                navigate('/set-password', { state: { email, phoneNumber, user_json_url } });
            };
        };
    };

    return (
        <div className='signup-container'>
            <div className='signup-wrapper'>
                <img src={imglogo} alt="logo" className='logo'/>
                <h2>Welcome to Blossom Boutique!</h2>
                <p>Please enter your email address and phone number to get started.</p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='labels'>Email</label>
                        <input className='email'
                            type="email"
                            placeholder='blossomsbotique@gmail.com'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className='labels'>Phone Number</label>
                        <input className='phone'
                            placeholder='9876543210'
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>
                    <button className="verify-btn" type="submit">Verify OTP</button>
                </form>
                <div className="pe_signin_button sign-btn" data-client-id="17740259540984966105"></div>
            </div>
        </div>
    );
};

export default SignUp;
