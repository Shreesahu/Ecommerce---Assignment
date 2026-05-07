import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../ReduxSlice/user/auth&UserSlice";
import productReducer from "../ReduxSlice/Product/productSlice";
import cartReducer from "../ReduxSlice/user/cartSlice";
import orderReducer from "../ReduxSlice/user/orderSlice";
import wishlistReducer from "../ReduxSlice/user/wishlistSlice";

const loadState = () => {
  try {
    const state = localStorage.getItem("appState");
    return state ? JSON.parse(state) : undefined;
  } catch {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    localStorage.setItem("appState", JSON.stringify(state));
  } catch (error) {
  console.error("Persist failed", error);
}
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    orders: orderReducer,
    wishlist: wishlistReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState({
    auth: store.getState().auth,
    cart: store.getState().cart,
    wishlist: store.getState().wishlist,
  });
});