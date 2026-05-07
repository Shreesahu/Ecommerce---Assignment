import axios from "axios";

const BASE_URL =
  "http://localhost:5000/api/orders";

const token =
  localStorage.getItem("token");

export const createOrderAPI =
  async (data) => {

    const response =
      await axios.post(
        `${BASE_URL}/add`,
        data,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    console.log(
      response,
      "response createOrderAPI"
    );

    return response.data;
};

export const getAllOrdersAPI =
  async () => {

    const response =
      await axios.get(
        `${BASE_URL}/all`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    console.log(
      response,
      "response getAllOrdersAPI"
    );

    return response.data;
};