import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // [{ product, quantity }]
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    setCart: (state, action) => {
      state.items = action.payload;
    },

    addToCart: (state, action) => {
      const item = state.items.find((i) => i.product.id === action.payload.id);

      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({
          product: action.payload,
          quantity: 1,
        });
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.product.id !== action.payload);
    },

    updateCartItem: (state, action) => {
      const item = state.items.find((i)=>i.product.id===action.payload.product.id)
      if(item){
        item.quantity = action.payload.quantity;
      }
    },    

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { setCart, addToCart, removeFromCart, updateCartItem, clearCart,} = cartSlice.actions;
export default cartSlice.reducer;
