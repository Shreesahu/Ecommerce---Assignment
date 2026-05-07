import axios from "axios";

export const getMostBoughtProductsAPI =
  async () => {

    const response =
      await axios.get(
        `${import.meta.env.BASE_URL}/api/products/most-bought`
      );

    return response.data;
};