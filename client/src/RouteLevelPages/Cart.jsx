import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { createOrderAPI } from "../api/orderCreationAPICALL.js";

import ProductCard from "../Components/ProductCard.jsx";

import { clearCart } from "../ReduxSlice/user/cartSlice";
import { clearCartAPI } from "../api/CartAPICall.js";

export default function Cart() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [paymentMode, setPaymentMode] = useState("COD");

  const [loading, setLoading] = useState(false);

  const items = useSelector((state) => state.cart.items);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);

      const payload = {
        paymentMode,

        items: items.map((item) => ({
          productId: item.product.id,

          quantity: item.quantity,
        })),
      };

      const response = await createOrderAPI(payload);

      const orderId = response.order.id;

      if (paymentMode === "COD") {
        await clearCartAPI();

        dispatch(clearCart());

        navigate(`/order-success/${orderId}`);

        return;
      }

      navigate(`/payment/${orderId}`);
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-500">Your Cart is Empty</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        {/* LEFT SIDE */}
        <div>
          {/* HEADER */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold">Cart</h1>

              <p className="text-gray-500 mt-2">
                Review quantities before checkout.
              </p>
            </div>

            <button
              onClick={() => dispatch(clearCart())}
              className="text-red-500 font-semibold hover:text-red-700"
            >
              Clear all
            </button>
          </div>

          {/* CART ITEMS */}
          <div className="space-y-6">
            {items.map((item) => (
              <ProductCard
                key={item.product.id}
                product={item.product}
                quantity={item.quantity}
                mode="cart"
              />
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:mt-[90px] h-fit sticky top-24 rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

          <div className="space-y-4 text-gray-700">
            <div className="flex justify-between">
              <span>Items</span>

              <span className="font-semibold">{totalItems}</span>
            </div>

            {/* PAYMENT OPTIONS */}
            <div>
              <p className="mb-3 font-semibold">Payment Method</p>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    value="COD"
                    checked={paymentMode === "COD"}
                    onChange={(e) => setPaymentMode(e.target.value)}
                  />

                  <span>Cash on Delivery</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    value="ONLINE"
                    checked={paymentMode === "ONLINE"}
                    onChange={(e) => setPaymentMode(e.target.value)}
                  />

                  <span>Online Payment</span>
                </label>
              </div>
            </div>

            <hr />

            <div className="flex justify-between text-2xl font-bold text-black">
              <span>Total</span>

              <span>₹{totalPrice}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="mt-8 w-full rounded-xl bg-black py-4 text-lg font-semibold text-white hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
