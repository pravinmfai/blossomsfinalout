import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../styles/checkout.css"; // Import CSS

const Checkout = ({ cartItems, userToken }) => {
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const location = useLocation();
  const { totalPrice, address } = location.state || {}; // Receiving address details
  const token = localStorage.getItem("token");

  const handlePayment = async () => {
    if (!token) {
      // alert("❌ User not authenticated. Please log in.");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Create Order on Backend
      const { data } = await axios.post(
        "https://blossomsfinalout.onrender.com/api/order/create",
        { amount: totalPrice, currency: "INR" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!data.orderId) {
        throw new Error("Failed to create order");
      }

      // 2️⃣ Load Razorpay Inside the Page with Dynamic Prefill Data
      const options = {
        key: "rzp_live_9Yn46F2ACAFs6k",
        amount: data.amount * 100, // Convert to paise
        currency: data.currency,
        name: "Blossoms Boutique",
        description: "Purchase Items",
        order_id: data.orderId,
        handler: async (response) => {
          // 3️⃣ Verify Payment on Backend
          try {
            const verifyRes = await axios.post(
              "https://blossomsfinalout.onrender.com/api/order/verify",
              response,
              { headers: { Authorization: `Bearer ${token}` } }
            );

            if (verifyRes.data.success) {
              setPaymentSuccess(true);
              alert("🎉 Payment Successful! Thank you for shopping.");
            } else {
              alert("❌ Payment verification failed!");
            }
          } catch (error) {
            console.error("Verification Error:", error);
            // alert("❌ Payment verification error!");
          }
        },
        prefill: {
          name: address?.name || "",
          email: "", // You may add an email field in the address form and pass it
          contact: address?.phoneNumber || "",
        },
        theme: {
          color: "#F37254",
        },
        modal: {
          backdropclose: false,
          ondismiss: () => {
            alert("Payment popup closed. Please try again.");
          },
        },
      };

      setTimeout(() => {
        const razor = new window.Razorpay(options);
        razor.open();
      }, 2000); // Small delay to ensure SDK loads properly

    } catch (error) {
      console.error("Payment Error:", error);
      alert("❌ Payment failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-details">
        <p><strong>Shipping Address:</strong></p>
        <p>{address?.name}</p>
        <p>{address?.street}, {address?.city}, {address?.state} - {address?.pincode}</p>
        <p>📞 {address?.phoneNumber}</p>
      </div>
      <p className="total-price">Total: ₹{totalPrice}</p>
      <button 
        className="payment-btn" 
        onClick={handlePayment} 
        disabled={loading || paymentSuccess}
      >
        {loading ? "Processing..." : paymentSuccess ? "Paid ✅" : "Pay Now"}
      </button>
      {paymentSuccess && <p className="payment-success">🎉 Payment Successful!</p>}
    </div>
  );
};

export default Checkout;
