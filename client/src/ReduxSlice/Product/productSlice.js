import { createSlice } from "@reduxjs/toolkit";

const initialState = {

  products: [],

  loading: false,

  error: null,

  cursor: null,

  hasMore: true,

};

const productSlice = createSlice({
  name: "products",

  initialState,

  reducers: {

    setProducts: (state, action) => {

      state.products = [
        ...state.products,
        ...action.payload,
      ];

    },
    resetProducts: (state) => {

   state.products = [];

   state.cursor = null;

   state.hasMore = true;

},

    setLoading: (state, action) => {

      state.loading = action.payload;

    },

    setError: (state, action) => {

      state.error = action.payload;

    },

    setCursor: (state, action) => {

      state.cursor = action.payload;

    },

    setHasMore: (state, action) => {

      state.hasMore = action.payload;

    },

  },
});

export const {
  setProducts,
  resetProducts,
  setLoading,
  setError,
  setCursor,
  setHasMore,
} = productSlice.actions;

export default productSlice.reducer;