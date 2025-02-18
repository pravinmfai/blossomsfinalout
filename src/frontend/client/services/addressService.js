import axios from 'axios';

const API_URL = 'https://blossomsfinalout.onrender.com/api/address';
axios.defaults.withCredentials = true;

export const saveAddress = async (address) => {
  const response = await axios.post(API_URL, address);
  return response.data;
};
