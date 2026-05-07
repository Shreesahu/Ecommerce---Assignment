import axios from "axios";

const BASE_URL =
  `${import.meta.env.BASE_URL}/api/wishlist`;

export const getWishlistAPI =
  async () => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.get(
        `${BASE_URL}/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response , "response-wishlist")
    return response.data;
  };

export const addWishlistAPI =
  async (productId) => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.post(
        `${BASE_URL}/add`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );  

    console.log(response.data ,  "Wishlist Data Newly added")
    return response.data;
  };

export const removeWishlistAPI =
  async (productId) => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.delete(
        `${BASE_URL}/remove/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };