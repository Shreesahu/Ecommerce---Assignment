import axios from "axios";
import { getAuthConfig } from "../Utils/getAuthConfig";


const BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/orders`;


export const createOrderAPI =
  async (data) => {

    const response =
      await axios.post(
        `${BASE_URL}/add`,
        data,
        getAuthConfig(),
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
        getAuthConfig(),
      );

    console.log(
      response,
      "response getAllOrdersAPI"
    );

    return response.data;
};