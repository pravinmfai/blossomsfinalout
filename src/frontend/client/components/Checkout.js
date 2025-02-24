import React, { useState } from "react";
import axios from "axios";

const Checkout = ({ cartItems, totalAmount, userToken }) => {
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);

      // 1️⃣ Create Order on Backend
      const { data } = await axios.post(
        "https://blossomsfinalout.onrender.com/api/order/create",
        { amount: totalAmount, currency: "INR" },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );

      if (!data.orderId) {
        throw new Error("Failed to create order");
      }

      // 2️⃣ Load Razorpay Inside the Page
      const options = {
        key: "rzp_live_9Yn46F2ACAFs6k", // Razorpay Key
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
              { headers: { Authorization: `Bearer ${userToken}` } }
            );

            if (verifyRes.data.success) {
              setPaymentSuccess(true);
              alert("🎉 Payment Successful! Thank you for shopping.");
            } else {
              alert("❌ Payment verification failed!");
            }
          } catch (error) {
            console.error("Verification Error:", error);
            alert("❌ Payment verification error!");
          }
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
        modal: {
          backdropclose: false, // Prevent closing on background click
          ondismiss: () => {
            alert("Payment popup closed. Please try again.");
          },
        },
      };

      const razor = new window.Razorpay(options);
      razor.open(); // Opens within the page (not a new window)
    } catch (error) {
      console.error("Payment Error:", error);
      alert("❌ Payment failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <p>Total Amount: ₹{totalAmount}</p>
      <button onClick={handlePayment} disabled={loading || paymentSuccess}>
        {loading ? "Processing..." : paymentSuccess ? "Paid ✅" : "Pay Now"}
      </button>
    </div>
  );
};

export default Checkout;
