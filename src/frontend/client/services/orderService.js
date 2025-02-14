import axios from 'axios';

const API_URL = 'http://localhost:5000/api/orders';
axios.defaults.withCredentials = true;

export const placeOrder = async (orderDetails) => {
  const response = await axios.post(API_URL, orderDetails);
  return response.data;
};
