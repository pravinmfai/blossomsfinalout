import React, { useState, useEffect } from 'react';
import { useAddress } from '../context/AddressContext';

const AddressForm = () => {
  const { saveAddress } = useAddress();
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    pincode: '',
    phoneNumber: '' 
  });

  useEffect(() => {
    // Fetch phone number from user API and pre-fill it
    const fetchPhoneNumber = async () => {
      try {
        const response = await fetch('/api/user'); 
        const userData = await response.json();
        setAddress(prevAddress => ({
          ...prevAddress,
          phoneNumber: userData.phoneNumber
        }));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchPhoneNumber();
  }, []);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveAddress(address);
    alert('Address saved!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Enter your address</h2>
      <input
        type="text"
        name="phoneNumber"
        value={address.phoneNumber} 
        readOnly
      />
      <input type="text" name="street" placeholder="Street" onChange={handleChange} required />
      <input type="text" name="city" placeholder="City" onChange={handleChange} required />
      <input type="text" name="state" placeholder="State" onChange={handleChange} required />
      <input type="text" name="pincode" placeholder="Pincode" onChange={handleChange} required />
      <button type="submit">Save Address</button>
    </form>
  );
};

export default AddressForm;
