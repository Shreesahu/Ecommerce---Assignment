import { useDispatch, useSelector } from "react-redux";
import { addCartAPI } from "../api/CartAPICall.js";
import { addToCart } from "../ReduxSlice/user/cartSlice.js";

export default function AddToCartButton({ product }) {

  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const cartItem = cartItems.find(
    (item) => item.product.id === product.id
  );

  const handleAddToCart = async (e) => {

    e.stopPropagation();

    try {

      await addCartAPI(product.id);

      dispatch(addToCart(product));

    } catch (error) {

      console.error(error);
    }
  };

  return (

    <button
      onClick={handleAddToCart}
      disabled={product.sold || cartItem}
      className={`rounded-lg px-4 py-2 text-sm font-semibold text-white transition disabled:cursor-not-allowed ${
        cartItem
          ? "bg-green-600"
          : "bg-black hover:bg-gray-800"
      }`}
    >

      {cartItem ? "Added" : "Add to Cart"}

    </button>
  );
}