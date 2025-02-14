import React from 'react';

const OrderConfirmation = ({ orderId }) => {
  return (
    <div>
      <h2>Order Confirmation</h2>
      <p>Your order has been placed successfully!</p>
      <p>Order ID: {orderId}</p>
    </div>
  );
};

export default OrderConfirmation;
