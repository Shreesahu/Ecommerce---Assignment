import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/products`;

export const getProductsAPI = async (cursor, limit) => {
  const response = await axios.get(`${BASE_URL}/get-all-product`, {
    params: { cursor, limit },
  });

  return response.data;
};

export const searchProductsAPI = async (title) => {
  const response = await axios.get(`${BASE_URL}/search-product`, {
    params: { title },
  });

  return response.data;
};

export const filterProductsAPI = async (category, maxPrice) => {
  const response = await axios.get(`${BASE_URL}/filter`, {
    params: {
      category,
      minPrice: 0,
      maxPrice,
    },
  });

  return response.data;
};

export const getSingleProductAPI = async (id) => {

  const response = await axios.get(`${BASE_URL}/get-product/${id}`);

  return response.data;
};