import axios from 'axios';

const API_URL = 'http://localhost:5000/api/address';
axios.defaults.withCredentials = true;

export const saveAddress = async (address) => {
  const response = await axios.post(API_URL, address);
  return response.data;
};
