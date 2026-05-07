import axios from "axios";

export const getMostBoughtProductsAPI =
  async () => {

    const response =
      await axios.get(
        "http://localhost:5000/api/products/most-bought"
      );

    return response.data;
};