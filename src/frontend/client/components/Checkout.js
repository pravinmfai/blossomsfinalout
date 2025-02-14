import React from 'react';
import { useCart } from '../context/CartContext';
import { useAddress } from '../context/AddressContext';
import { placeOrder } from '../services/orderService';
import AddressForm from './AddressForm';
import Cart from './Cart';

const Checkout = () => {
  const { cartState } = useCart();
  const { addressState } = useAddress();

  const handleCheckout = async () => {
    if (cartState.items.length === 0 || !addressState) {
      alert('Cart is empty or address not provided!');
      return;
    }

    const orderDetails = {
      items: cartState.items,
      address: addressState
    };
// eslint-disable-next-line 
    const order = await placeOrder(orderDetails);
    alert('Order placed successfully!');
  };

  return (
    <div>
      <h2>Checkout</h2>
      <Cart />
      <AddressForm />
      <button onClick={handleCheckout}>Place Order</button>
    </div>
  );
};

export default Checkout;
