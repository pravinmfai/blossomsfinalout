// frontend/src/services/cartService.js
import axios from 'axios';

const API_URL = 'https://blossomsfinalout.onrender.com/api/cart'; // Adjust according to your backend route

// Make sure credentials are included for cross-origin requests (if using cookies)
axios.defaults.withCredentials = true;

// Fetch cart items
export const getCartItems = async () => {
  try {
    const token = localStorage.getItem('token'); // Assuming you're storing token in localStorage
    const response = await axios.get(`${API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add token to request headers
      },
    });
    return response.data; // Adjust response structure as needed
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;
  }
};

// Update cart item quantity
export const updateCartItem = async (productId, quantity) => {
  try {
    const token = localStorage.getItem('token'); // Get token from localStora
    const response = await axios.post(`${API_URL}/add`, { productId, quantity }, {
      headers: {
        Authorization: `Bearer ${token}`, // Add token to request headers
      },
    });
    return response.data.cart; // Adjust response structure as needed
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};

// Remove cart item
export const removeCartItem = async (productId) => {
  try {
    const token = localStorage.getItem('token'); // Get token from localStorage
    const response = await axios.put(`${API_URL}/remove`, { productId }, {
      headers: {
        Authorization: `Bearer ${token}`, // Add token to request headers
      },
    });
    return response.data.cart; // Adjust response structure as needed
  } catch (error) {
    console.error('Error removing cart item:', error);
    throw error;
  }
};
