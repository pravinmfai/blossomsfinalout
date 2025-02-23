import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAddress } from '../context/AddressContext';
import { placeOrder } from '../services/orderService';
import AddressForm from './AddressForm';
import Cart from './Cart';

const Checkout = () => {
  const { cartState } = useCart();
  const { addressState } = useAddress();
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Load Razorpay script once
  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => setRazorpayLoaded(true);
      document.body.appendChild(script);
    };

    if (!window.Razorpay) {
      loadRazorpayScript();
    } else {
      setRazorpayLoaded(true);
    }
  }, []);

  const handleCheckout = async () => {
    if (cartState.items.length === 0 || !addressState) {
      alert('Cart is empty or address not provided!');
      return;
    }

    if (!razorpayLoaded) {
      alert('Payment service is still loading, please wait.');
      return;
    }

    const totalAmount = cartState.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    try {
      // Request order creation from backend
      const orderResponse = await placeOrder({
        items: cartState.items,
        address: addressState,
        totalAmount,
      });

      if (!orderResponse || !orderResponse.orderId) {
        throw new Error('Invalid order response');
      }

      const { orderId, amount, currency } = orderResponse;

      const options = {
        key: 'rzp_live_9Yn46F2ACAFs6k', // Replace with your actual Razorpay Key ID
        amount: amount * 100, // Razorpay expects the amount in paise
        currency: currency,
        name: 'Blossoms Boutique',
        description: 'Order Payment',
        order_id: orderId,
        handler: function (response) {
          alert('Payment successful!');
          console.log('Payment ID:', response.razorpay_payment_id);
        },
        prefill: {
          name: addressState.name || 'Customer',
          email: 'user@example.com', // Replace with actual user email
          contact: addressState.phoneNumber || '',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Failed to initiate payment. Please try again.');
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <Cart />
      <AddressForm />
      <button onClick={handleCheckout} disabled={!razorpayLoaded}>
        {razorpayLoaded ? 'Proceed to Payment' : 'Loading Payment Gateway...'}
      </button>
    </div>
  );
};

export default Checkout;
