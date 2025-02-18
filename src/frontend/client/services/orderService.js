import axios from 'axios';

const API_URL = 'https://blossomsfinalout.onrender.com/api/orders';
axios.defaults.withCredentials = true;

export const placeOrder = async (orderDetails) => {
  const response = await axios.post(API_URL, orderDetails);
  return response.data;
};
