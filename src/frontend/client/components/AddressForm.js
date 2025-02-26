import React, { useState, useEffect } from 'react';
import { useAddress } from '../context/AddressContext';
import '../styles/AddressForm.css';
import { useNavigate, useLocation } from 'react-router-dom';
import indianCities from '../data/indianCities.json'; // Import the dataset

const AddressForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { saveAddress } = useAddress();
  const [address, setAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    phoneNumber: ''
  });
  const [cities, setCities] = useState([]);
  const totalPrice = location.state?.totalPrice || 0;

  useEffect(() => {
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
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });

    if (name === 'state') {
      setCities(indianCities[value] || []);
      setAddress(prevAddress => ({ ...prevAddress, city: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (address.street.length > 200) {
      alert('Full address should not exceed 200 characters.');
      return;
    }
    const pincodePattern = /^[1-9][0-9]{5}$/;
    if (!pincodePattern.test(address.pincode)) {
      alert('Please enter a valid 6-digit Indian pincode.');
      return;
    }
    if (!address.state || !address.city) {
      alert('Please select both state and city.');
      return;
    }
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

      // alert("Address saved successfully!");
      navigate('/checkout', { state: { address, totalPrice } });
    } catch (error) {
      // console.error("Error saving address:", error);
      // alert("Failed to save address. Please try again.");
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
        <input
          type="text"
          name="street"
          placeholder="Full Address [Door No, Street, Area, Colony]"
          value={address.street}
          onChange={handleChange}
          required
          className="address-input"
          maxLength="200" // Limit input to 200 characters
        />
        <select
          name="state"
          value={address.state}
          onChange={handleChange}
          required
          className="address-input"
        >
          <option value="">Select State</option>
          {Object.keys(indianCities).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        <select
          name="city"
          value={address.city}
          onChange={handleChange}
          required
          className="address-input"
          disabled={!address.state}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={address.pincode}
          onChange={handleChange}
          required
          className="address-input"
          pattern="^[1-9][0-9]{5}$" // Regex pattern for 6-digit Indian pincode
          title="Please enter a valid 6-digit Indian pincode."
        />
        <button type="submit" className="address-submit-btn">
          Save Address and Checkout
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
