import React, { useEffect, useState } from 'react';
import { getCartItems, updateCartItem, removeCartItem } from '../services/cartService';
import '../styles/Cart.css'; // Import your CSS file

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    console.log('Cart Items:', cartItems)  // This should show the cart items in the console


    // Fetch cart items when component mounts
    useEffect(() => {
      const fetchCart = async () => {
          try {
              const cartData = await getCartItems();
              console.log('Cart Data:', cartData);  // Logs entire API response to check structure
  
              // Correctly accessing cartData.cart.items instead of cartData.items
              if (cartData && cartData.cart && cartData.cart.items) {
                  setCartItems(cartData.cart.items);  // Set the items properly
                  calculateTotalPrice(cartData.cart.items);
              } else {
                  setCartItems([]);  // Fallback for no items
              }
          } catch (error) {
              console.error("Error fetching cart data:", error);
          }
      };
  
        fetchCart();
    }, []);

    // Calculate total price
    const calculateTotalPrice = (items) => {
        const total = items.reduce((acc, item) => acc + item.quantity * item.productId.price, 0);
        setTotalPrice(total);
    };

    // Handle quantity change
    const handleQuantityChange = async (productId, quantity) => {
      console.log("Requested Product ID for update:", productId); 
      try {
          // Check if the product exists in the cart
          const item = cartItems.find(item => item.productId._id === productId);
          
          if (!item) {
              console.error("Product not found in the cart");
              return;
          }
  
          if (quantity < 1) return; // Prevents setting quantity to zero
  
          // Now proceed to update using the cart item _id
          const updatedCart = await updateCartItem(item._id, quantity);
          if (updatedCart && updatedCart.items) {
              setCartItems(updatedCart.items);
              calculateTotalPrice(updatedCart.items);
          }
      } catch (error) {
          console.error("Error updating cart item:", error);
      }
  };
  

    // Handle removing item from cart
    const handleRemoveItem = async (productId) => {
      try {
          // Check if the product exists in the cart
          const item = cartItems.find(item => item.productId._id === productId);
          
          if (!item) {
              console.error("Product not found in the cart");
              return;
          }
  
          // Now proceed to remove the item using the cart item _id
          const updatedCart = await removeCartItem(item._id);
          if (updatedCart && updatedCart.items) {
              setCartItems(updatedCart.items);
              calculateTotalPrice(updatedCart.items);
          }
      } catch (error) {
          console.error("Error removing item from cart:", error);
      }
  };
  

    // Proceed to address step
    const proceedToAddress = () => {
        window.location.href = '/address'; // Redirect to the address page
    };

    return (
        <div className="cart-container">
            <div className="cart">
                <h2>Cart</h2>
                <table className="cart-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.length === 0 ? (
                            <tr>
                                <td colSpan="4">Your cart is empty. Please add some items to proceed.</td>
                            </tr>
                        ) : (
                            cartItems.map((item) => (
                                <tr key={item._id}>
                                    <td>
                                        <input type="checkbox" />
                                    </td>
                                    <td className="product-info">
                                        {item.productId ? (
                                            <>
                                                <img
                                                    src={item.productId.imageUrl}
                                                    alt={item.productId.name}
                                                    className="product-img"
                                                />
                                                <div>
                                                    <p>{item.productId.name}</p>
                                                    <span>{item.productId.material}</span>
                                                </div>
                                            </>
                                        ) : (
                                            <p>Product details unavailable</p>
                                        )}
                                    </td>
                                    <td className="quantity-section">
                                        <button
                                            onClick={() =>
                                                handleQuantityChange(item.productId._id, item.quantity - 1)
                                            }
                                            disabled={item.quantity === 1}
                                        >
                                            &ndash;
                                        </button>
                                        <input type="text" value={item.quantity} readOnly />
                                        <button
                                            onClick={() =>
                                                handleQuantityChange(item.productId._id, item.quantity + 1)
                                            }
                                        >
                                            +
                                        </button>
                                    </td>
                                    <td>₹{(item.productId.price * item.quantity).toFixed(2)}</td>
                                    <td>
                                        <button onClick={() => handleRemoveItem(item.productId._id)}>
                                            <i className="fa fa-trash"></i> Remove
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="price-details">
                <h3>Price Details</h3>
                <div className="price-row">
                    <p>Subtotal</p>
                    <p>₹{totalPrice.toFixed(2)}</p>
                </div>
                <div className="price-row">
                    <p>Discount</p>
                    <p>₹0.00</p>
                </div>
                <div className="price-row grand-total">
                    <p>Grand-total</p>
                    <p>₹{totalPrice.toFixed(2)}</p>
                </div>
                <button className="checkout-btn" onClick={proceedToAddress}>Checkout now</button>
            </div>
        </div>
    );
};

export default Cart;

