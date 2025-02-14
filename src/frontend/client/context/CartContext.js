// frontend/src/context/CartContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getCartItems, updateCartItem, removeCartItem } from '../services/cartService'; // Corrected imports
import { useContext } from 'react';

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartContext = createContext();


export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCartItems = async () => {
    try {
      const { cart, totalPrice } = await getCartItems();
      setCartItems(cart.items);
      setTotalPrice(totalPrice);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateCart = async (productId, quantity) => {
    try {
      const updatedCart = await updateCartItem(productId, quantity); // Using the correct function
      setCartItems(updatedCart.items);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const updatedCart = await removeCartItem(productId); // Using the correct function
      setCartItems(updatedCart.items);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, totalPrice, updateCart, removeFromCart, loading }}>
      {children}
    </CartContext.Provider>
  );
};
