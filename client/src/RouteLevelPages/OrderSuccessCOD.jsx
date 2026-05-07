import { Link, useParams } from "react-router-dom";

export default function OrderSuccess() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-3xl shadow-sm text-center w-full max-w-md">
        <div className="text-6xl mb-4">✅</div>

        <h1 className="text-3xl font-bold mb-3">Order Placed Successfully</h1>

        <p className="text-gray-500 mb-2">Your order has been confirmed.</p>

        <p className="text-lg font-semibold mb-8">Order ID: #{id}</p>

        <Link
          to="/"
          className="block w-full rounded-xl bg-black py-4 text-white font-semibold hover:bg-gray-800 transition"
        >
          Continue Shopping
        </Link>
        <Link
          to="/track-my-orders"
          className="mt-4 block w-full rounded-xl border border-black py-4 text-center font-semibold hover:bg-gray-100 transition"
        >
          Track My Orders
        </Link>
      </div>
    </div>
  );
}
