import { useNavigate, useParams } from "react-router-dom";
import { completePaymentAPI, cancelPaymentAPI } from "../api/paymentAPICall.js";
import { useDispatch } from "react-redux";
import { clearCart } from "../ReduxSlice/user/cartSlice";
import { clearCartAPI } from "../api/CartAPICall.js";

export default function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePayment = async () => {
    try {
      await completePaymentAPI(id);
      await clearCartAPI();

      dispatch(clearCart());
      navigate(`/order-success/${id}`);
    } catch (error) {
      console.log(error);

      alert("Payment failed");
    }
  };

  const handleCancel = async () => {
    try {
      await cancelPaymentAPI(id);

      navigate("/cart");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-3xl shadow-sm w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8 text-center">Online Payment</h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Card Number"
            className="w-full border rounded-xl p-4 outline-none"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="MM/YY"
              className="border rounded-xl p-4 outline-none"
            />

            <input
              type="text"
              placeholder="CVV"
              className="border rounded-xl p-4 outline-none"
            />
          </div>
        </div>

        <button
          onClick={handlePayment}
          className="mt-8 w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition"
        >
          Simulate Payment
        </button>

        <button
          onClick={handleCancel}
          className="mt-4 w-full border border-red-500 text-red-500 py-4 rounded-xl font-semibold hover:bg-red-50 transition"
        >
          Cancel Payment
        </button>
      </div>
    </div>
  );
}
