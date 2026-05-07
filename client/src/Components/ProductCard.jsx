import { useDispatch } from "react-redux";
import AddToCartButton from "./AddToCartButton.jsx";
import WishlistButton from "./WishlistButton.jsx";
import {removeFromCart,updateCartItem } from "../ReduxSlice/user/cartSlice.js";
import { removeCartAPI, updateCartAPI } from "../api/CartAPICall.js";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, mode = "home", quantity,totalSold,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleItemRemoveFromCart = async (e) => {
    e.stopPropagation();

    try {
      await removeCartAPI(product.id);

      dispatch(removeFromCart(product.id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleItemQuantity = async (e, type) => {
    e.stopPropagation();

    try {
      let response;

      if (type === "increase") {
        response = await updateCartAPI(product.id, quantity + 1);
      }

      if (type === "decrease") {
        if (quantity <= 1) return;

        response = await updateCartAPI(product.id, quantity - 1);
      }

      dispatch(
        updateCartItem({
          product,
          quantity: response.item.quantity,
        }),
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <article
      onClick={() => navigate(`/product/${product.id}`)}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >

      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-105"
        />

        <div className="absolute left-3 top-3 flex gap-2">
          {product.isSale && (
            <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow">
              Sale
            </span>
          )}

          {product.sold && (
            <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white shadow">
              Sold
            </span>
          )}
        </div>

        {mode !== "cart" && (
          <div className="absolute right-3 top-3">
            <WishlistButton product={product} />
          </div>
        )}

        {totalSold && (
          <div className="absolute bottom-3 right-3 rounded-full bg-black/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            {totalSold} sold
          </div>
        )}
      </div>

      <div className="flex h-[220px] flex-col justify-between p-4">

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            {product.category}
          </p>

          <h2 className="line-clamp-1 text-lg font-semibold text-gray-950">
            {product.title}
          </h2>

          <p className="line-clamp-2 text-sm text-gray-600">
            {product.description}
          </p>

          <p
            className={`text-sm font-semibold ${
              product.sold ? "text-red-600" : "text-emerald-600"
            }`}
          >
            {product.sold ? "Out of Stock" : "In Stock"}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 pt-4">
          <span className="text-2xl font-bold text-gray-950">
            ₹{product.price}
          </span>

          {mode === "cart" ? (
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => handleItemQuantity(e, "decrease")}
                className="h-9 w-9 rounded-lg border border-gray-300 text-lg font-semibold hover:bg-gray-100"
              >
                -
              </button>

              <span className="w-8 text-center font-semibold">{quantity}</span>

              <button
                onClick={(e) => handleItemQuantity(e, "increase")}
                className="h-9 w-9 rounded-lg border border-gray-300 text-lg font-semibold hover:bg-gray-100"
              >
                +
              </button>
            </div>
          ) : (
            <AddToCartButton product={product} />
          )}
        </div>

        {mode === "cart" && (
          <button
            onClick={handleItemRemoveFromCart}
            className="mt-4 w-full rounded-lg bg-red-600 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Remove From Cart
          </button>
        )}
      </div>
    </article>
  );
}
