import axios from "axios";

const BASE_URL =
  "http://localhost:5000/api/products";

export const getAllProductsAPI =
  async ({
    cursor,
    limit,
  }) => {

    const response =
      await axios.get(
        `${BASE_URL}/get-all-product`,
        {
          params: {
            limit,
            ...(cursor !== null &&
              cursor !== undefined && {
                cursor,
              }),
          },
        }
      );

    return response.data;
  };

export const searchProductsAPI =
  async (searchText) => {

    const response =
      await axios.get(
        `${BASE_URL}/search-product`,
        {
          params: {
            title: searchText,
          },
        }
      );
      console.log(response , "response for search")
    return response.data;
  };