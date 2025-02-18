import React, { useState, useEffect } from 'react';
import { useAddress } from '../context/AddressContext';
import '../styles/AddressForm.css';
import { useNavigate } from 'react-router-dom'; // Correct import

const AddressForm = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const { saveAddress } = useAddress();
  const [address, setAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    phoneNumber: '' 
  });

  useEffect(() => {
    // Fetch name and phone number from user API and pre-fill them
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://blossomsfinalout.onrender.com/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch user data');
        const userData = await response.json();
        setAddress(prevAddress => ({
          ...prevAddress,
          name: userData.name || '', 
          phoneNumber: userData.phone || ''
        }));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://blossomsfinalout.onrender.com/api/address/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(address),
      });
  
      if (!response.ok) throw new Error("Failed to save address");
  
      alert("Address saved successfully!");
      navigate('/checkout'); // Correct way to navigate
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Failed to save address. Please try again.");
    }
  };

  return (
    <div className="address-form-container">
      <form onSubmit={handleSubmit} className="address-form">
        <h2>Enter your address</h2>
        <input
          type="text"
          name="name"
          value={address.name} 
          readOnly
          className="address-input readonly"
        />
        <input
          type="text"
          name="phoneNumber"
          value={address.phoneNumber} 
          readOnly
          className="address-input readonly"
        />
        <input type="text" name="street" placeholder="Full Address [Door No, Street, Area, Colony]" value={address.street} onChange={handleChange} required className="address-input" />
        <input type="text" name="city" placeholder="City" value={address.city} onChange={handleChange} required className="address-input" />
        <input type="text" name="state" placeholder="State" value={address.state} onChange={handleChange} required className="address-input" />
        <input type="text" name="pincode" placeholder="Pincode" value={address.pincode} onChange={handleChange} required className="address-input" />
        <button type="submit" className="address-submit-btn">Save Address and Checkout</button>
      </form>
    </div>
  );
};

export default AddressForm;
