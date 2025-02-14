// src/components/AuthForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AuthForm.css';


const AuthForm = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  // Handle form field change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Toggle between Login and Signup mode
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  // Handle form submission for login/signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const url = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/signup';
      const response = await axios.post(url, form);

      if (response.status === 200) {
        alert(isLogin ? 'Login successful!' : 'Signup successful!');
        // Redirect to cart page on success
        navigate('/cart');
      }
    } catch (error) {
      alert('Error during authentication: ' + error.response.data.message);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>{isLogin ? 'Login' : 'Signup'}</h2>
        
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        
        <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>

        <p>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span onClick={toggleAuthMode} className="auth-toggle">
            {isLogin ? 'Signup' : 'Login'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
