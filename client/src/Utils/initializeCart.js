import { setCart }from "../ReduxSlice/user/cartSlice";
import { getCartAPI }from "../api/CartAPICall.js";

export const initializeCart =
  async (dispatch) => {

    try {

      const data =
        await getCartAPI();

      const formattedItems =
        data.items.map(
          (item) => ({
            product:
              item.Product,
            quantity:
              item.quantity,
          })
        );

      dispatch(
        setCart(
          formattedItems
        )
      );

    } catch (error) {

      console.error(error);

    }
};