import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { getCartItems, updateCartItem, removeCartItem } from '../services/cartService'; // Corrected imports
import axios from 'axios';

// Custom hook to use the CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartContext = createContext();

// CartProvider to provide context values
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);  // Holds cart items
  const [totalPrice, setTotalPrice] = useState(0);  // Holds total price
  const [originalTotalPrice, setOriginalTotalPrice] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [loading, setLoading] = useState(true);  // Loading state for fetching cart items
  const [error, setError] = useState(null);  // Error state for handling errors

  // Fetch cart items and set the state
  const fetchCartItems = useCallback(async () => {
    setLoading(true);
    try {
        const cartData = await getCartItems(); // Fetch cart data

        if (cartData && Array.isArray(cartData) && cartData.length > 0) {
            // Fetch product details for each item in the cart
            const cartItemsWithDetails = await Promise.all(
                cartData.map(async (item) => {
                    const productDetails = await fetchProductDetails(item.productId); // API call to get product details
                    return {
                        ...item,
                        productId: productDetails, // Attach full product details to cart item
                    };
                })
            );
            setCartItems(cartItemsWithDetails); // Set cart items with product details
            calculateTotalPrice(cartItemsWithDetails); // Recalculate total price
        } else {
            setCartItems([]); // If no items in cart, set empty
        }
    } catch (error) {
        setError('Failed to fetch cart items');
        console.error("Error fetching cart items:", error);
    } finally {
        setLoading(false);
    }
  }, []); // Empty dependency array means this function is stable and won't change

  const fetchProductDetails = async (productId) => {
    try {
      const response = await axios.get(`https://backend-blssm-1.onrender.com/api/products/${productId}`);
      return response.data; // Return product details (name, price, etc.)
    } catch (error) {
      console.error("Error fetching product details:", error);
      return {}; // Return empty object if product details are not found
    }
  };

  // Calculate total price
  const calculateTotalPrice = (cartItems) => {
    if (!cartItems || cartItems.length === 0) return; // Ensure cartItems is not empty
  
    const total = cartItems.reduce((acc, item) => acc + item.productId.price * item.quantity, 0);
    const discount = total * 0.20; // 20% discount
    const totalPriceAfterDiscount = total - discount;
  
    setTotalPrice(totalPriceAfterDiscount);
    setDiscountAmount(discount);
    setOriginalTotalPrice(total);
  };
  

  // Update cart item quantity
  const updateCart = async (productId, quantity) => {
    try {
      const updatedCart = await updateCartItem(productId, quantity);
      setCartItems(updatedCart.items);
    } catch (error) {
      setError('Failed to update cart item');
      console.error('Error updating cart:', error);
    }
  };

  // Remove an item from the cart
  const removeFromCart = async (productId) => {
    try {
      const updatedCart = await removeCartItem(productId);
      setCartItems(updatedCart.items);
    } catch (error) {
      setError('Failed to remove cart item');
      console.error('Error removing from cart:', error);
    }
  };

  // Fetch cart items on component mount
  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]); // Include fetchCartItems as a dependency

  return (
    <CartContext.Provider value={{ cartItems, totalPrice, updateCart, removeFromCart, loading, error, originalTotalPrice, discountAmount }}>
      {children}
    </CartContext.Provider>
  );
};
