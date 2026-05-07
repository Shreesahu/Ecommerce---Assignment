import axios from "axios";
import { getAuthConfig } from "../Utils/getAuthConfig";


const BASE_URL =
  `${import.meta.env.VITE_BASE_URL}/api/payment`;

export const completePaymentAPI =
  async (orderId) => {

    const response =
      await axios.patch(
        `${BASE_URL}/pay/${orderId}`,
        {},
        getAuthConfig()
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
        getAuthConfig()
      );

    console.log(
      response,
      "response cancelPaymentAPI"
    );

    return response.data;
};