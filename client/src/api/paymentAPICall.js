import axios from "axios";

const BASE_URL =
  "http://localhost:5000/api/payment";

const token =
  localStorage.getItem("token");

export const completePaymentAPI =
  async (orderId) => {

    const response =
      await axios.patch(
        `${BASE_URL}/pay/${orderId}`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    console.log(
      response,
      "response completePaymentAPI"
    );

    return response.data;
};

export const cancelPaymentAPI =
  async (orderId) => {

    const response =
      await axios.patch(
        `${BASE_URL}/payment-cancel/${orderId}`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    console.log(
      response,
      "response cancelPaymentAPI"
    );

    return response.data;
};