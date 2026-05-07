import { setWishlist } from "../ReduxSlice/user/wishlistSlice";

import { getWishlistAPI } from "../api/WishListAPICALL.js";

export const initializeWishlist =
  async (dispatch) => {

    const token =
      localStorage.getItem("token");

    if (!token) return;

    try {

      const data =
        await getWishlistAPI();

      dispatch(
        setWishlist(
          data.wishlist
        )
      );

    } catch (error) {

      console.error(error);

    }
};