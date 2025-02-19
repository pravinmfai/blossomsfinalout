import React, { useContext, useEffect } from 'react';
import { useCart } from '../context/CartContext'; // Adjust the import path accordingly
import '../styles/Cart.css'; // Import your CSS file
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
    const navigate = useNavigate();
    const { cartItems = [], totalPrice, originalTotalPrice, discountAmount, loading, error, updateCart, removeFromCart } = useCart();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please log in to access your cart");
            navigate("/login");
        }
    }, [navigate]);

    const handleApiError = (error) => {
        if (error.response && error.response.status === 401) {
            alert("Session expired. Please log in again.");
            localStorage.removeItem("token");
            navigate("/login");
        }
    };

    const refreshCart = () => {
        window.location.reload();
    };

    if (loading) return <div style={{ marginTop: "200px" }}>Loading...</div>;
    if (error) return <div style={{ marginTop: "200px" }}>Error: {error}</div>;

    return (
      <div className="cart-container">
        <div className="cart">
          <h2>Cart</h2>
          <table className="cart-table">
            <thead>
              <tr>
                <th></th>
                <th>Product</th>
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
                        src={item.productId.imageUrl ? `https://backend-blssm-1.onrender.com${item.productId.imageUrl}` : 'default-image-url.jpg'}
                        alt={item.productId.name || 'Product'}
                        className="product-img"
                        />
                          <div>
                            <p>{item.productId.name || 'Unnamed Product'}</p>
                          </div>
                        </>
                      ) : (
                        <p>Product details unavailable</p>
                      )}
                    </td>
                    <td className="quantity-section">
                      <button className='quantity-btn'
                        onClick={() => updateCart(item.productId._id, item.quantity - 1).catch(handleApiError).finally(refreshCart)}
                        disabled={item.quantity === 1}
                      >
                        &ndash;
                      </button>
                      <input type="text" value={item.quantity} readOnly />
                      <button
                        onClick={() => updateCart(item.productId._id, item.quantity + 1).catch(handleApiError).finally(refreshCart)}
                      >
                        +
                      </button>
                    </td>
                    <td>₹{((item.productId.price * item.quantity) * (1 - (item.productId.discountPercentage / 100))).toFixed(2)}</td>
                    <td>
                                      <button
                    className="remove-button"
                    onClick={() => removeFromCart(item.productId._id).catch(handleApiError).finally(refreshCart)}
                  >
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
            <p>₹{originalTotalPrice}</p>
          </div>
          <div className="price-row">
            <p>Discount</p>
            <p>₹{discountAmount}</p>
          </div>
          <div className="price-row grand-total">
            <p>Grand-total</p>
            <p>₹{totalPrice}</p>
          </div>
          <button className="checkout-btn" onClick={() => window.location.href = '/address'}>Checkout now</button>
        </div>
      </div>
    );
  };
export default Cart;
