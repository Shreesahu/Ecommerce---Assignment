import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getAllOrdersAPI } from "../api/orderCreationAPICALL";

import { setOrders } from "../ReduxSlice/user/orderSlice";

import UserInfo from "../Components/UserInfo";
import Orders from "../Components/Orders";

export default function Profile() {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.user);

  const orders = useSelector((state) => state.orders.orders);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrdersAPI();

        dispatch(setOrders(response.orders));
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">User not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* PROFILE */}

        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <UserInfo user={currentUser} />
        </div>

        {/* ORDERS */}

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-3xl font-bold">My Orders</h2>

            <p className="mt-1 text-gray-500">Track all your purchases</p>
          </div>

          <Orders orders={orders} />
        </div>
      </div>
    </div>
  );
}
