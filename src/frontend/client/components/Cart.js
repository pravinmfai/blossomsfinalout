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
        } else {
            const tokenTime = localStorage.getItem("tokenTime");
            const currentTime = Date.now();
            if (tokenTime && currentTime - tokenTime > 3600000) {
                alert("Session expired. Please log in again.");
                localStorage.removeItem("token");
                localStorage.removeItem("tokenTime");
                navigate("/login");
            }
        }
    }, [navigate]);

    const isCheckoutDisabled = cartItems.length === 0 || cartItems.every(item => item.quantity === 0);    

    const handleApiError = (error) => {
        if (error.response && error.response.status === 401) {
            const tokenTime = localStorage.getItem("tokenTime");
            const currentTime = Date.now();
            if (tokenTime && currentTime - tokenTime > 3600000) {
                localStorage.removeItem("token");
                localStorage.removeItem("tokenTime");
                navigate("/login");
            } else {
                refreshCart();
            }
        }
    };

    const refreshCart = () => {
        window.location.reload();
    };

    if (loading) {
        return (
            <div className="loader-containerc">
                <div className="loaderc"></div>
                <p>Loading...</p>
            </div>
        );
    }

    if (error)
      return (
        <div
          style={{
            marginTop: "200px",
            textAlign: "center",
            padding: "20px",
            border: "1px solid #ff4d4f",
            borderRadius: "8px",
            backgroundColor: "#fff1f0",
            color: "#a8071a",
            maxWidth: "400px",
            marginLeft: "auto",
            marginRight: "auto",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p style={{ fontSize: "18px", fontWeight: "bold" }}>Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              fontSize: "16px",
              backgroundColor: "#ff4d4f",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#d9363e")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#ff4d4f")}
          >
            Refresh
          </button>
        </div>
      );
    

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
                        src={item.productId.imageUrl}
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
          <button
      className="checkout-btn"
      onClick={() => navigate("/address", { state: { cartItems, totalPrice } })}
      disabled={isCheckoutDisabled}
      style={{
        backgroundColor: isCheckoutDisabled ? "#ccc" : "#000000",
        cursor: isCheckoutDisabled ? "not-allowed" : "pointer",
      }}
    >
      Checkout now
    </button>
        </div>
      </div>
    );
  };
export default Cart;
