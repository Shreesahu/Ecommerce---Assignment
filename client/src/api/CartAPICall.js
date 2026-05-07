import axios from "axios";
import { getAuthConfig } from "../Utils/getAuthConfig";
const BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/cart`;


export const getCartAPI = async () => {
  const response = await axios.get(`${BASE_URL}/items`, getAuthConfig());

  return response.data;
};

export const addCartAPI = async (productId) => {
  const response = await axios.post(
    `${BASE_URL}/items/add`,
    {
      productId,
      quantity: 1,
    },
    getAuthConfig(),
  );

  return response.data;
};

export const updateCartAPI = async (productId, quantity) => {
  const response = await axios.patch(
    `${BASE_URL}/items/update`,
    {
      productId,
      quantity,
    },
    getAuthConfig(),
  );

  return response.data;
};

export const removeCartAPI = async (productId) => {
  const response = await axios.delete(`${BASE_URL}/items/remove`, {
    ...getAuthConfig(),

    data: {
      productId,
    },
  });

  return response.data;
};

export const clearCartAPI = async () => {
  const response = await axios.delete(`${BASE_URL}/clear`, getAuthConfig());

  return response.data;
};
