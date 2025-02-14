// frontend/src/services/cartService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/cart'; // Adjust according to your backend route
axios.defaults.withCredentials = true;

// Fetch cart items
export const getCartItems = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data; // Adjust response structure as needed
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;
  }
};

// Update cart item quantity
export const updateCartItem = async (productId, quantity) => {
  try {
    const response = await axios.put(`${API_URL}/update`, { productId, quantity });
    return response.data.cart; // Adjust response structure as needed
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};

// Remove cart item
export const removeCartItem = async (productId) => {
  try {
    const response = await axios.put(`${API_URL}/remove`, { productId });
    return response.data.cart; // Adjust response structure as needed
  } catch (error) {
    console.error('Error removing cart item:', error);
    throw error;
  }
};
