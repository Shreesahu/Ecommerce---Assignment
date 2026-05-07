import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState,

  reducers: {

    setWishlist: (
      state,
      action
    ) => {

      return action.payload;
    },

    addToWishlist: (
      state,
      action
    ) => {

      const exists =
        state.some(
          (item) =>
            item.product.id ===
            action.payload.product.id
        );

      if (!exists) {
        state.push(
          action.payload
        );
      }
    },

    removeFromWishlist: (
      state,
      action
    ) => {

      return state.filter(
        (item) =>
          item.product.id !==
          action.payload
      );
    },
  },
});

export const {
  setWishlist,
  addToWishlist,
  removeFromWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;