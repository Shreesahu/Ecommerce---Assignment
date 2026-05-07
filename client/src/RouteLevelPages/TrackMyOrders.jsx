import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getAllOrdersAPI } from "../api/orderCreationAPICALL.js";

import { setOrders } from "../ReduxSlice/user/orderSlice";

export default function TrackMyOrders() {

  const dispatch = useDispatch();

  const orders = useSelector(
    (state) => state.orders.orders
  );

  const fetchOrders = async () => {

    try {

      const response =
        await getAllOrdersAPI();

      dispatch(
        setOrders(response.orders)
      );

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchOrders();

  }, []);

  return (

    <div className="min-h-screen bg-gray-100 px-6 py-10">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Track My Orders
        </h1>

        <div className="space-y-6">

          {
            orders.map((order) => (

              <div
                key={order.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
              >

                <div className="flex items-center justify-between mb-4">

                  <div>

                    <h2 className="text-xl font-bold">
                      Order #{order.id}
                    </h2>

                    <p className="text-gray-500 text-sm">
                      {
                        new Date(
                          order.createdAt
                        ).toLocaleDateString()
                      }
                    </p>

                  </div>

                  <div
                    className={`px-4 py-2 rounded-full text-sm font-semibold
                    ${
                      order.status === "PAID"
                        ? "bg-green-100 text-green-700"

                        : order.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"

                        : "bg-red-100 text-red-700"
                    }`}
                  >

                    {order.status}

                  </div>

                </div>

                <div className="space-y-4">

                  {
                    order.OrderItem.map((item) => (

                      <div
                        key={item.id}
                        className="flex items-center justify-between border-b pb-3"
                      >

                        <div className="flex items-center gap-4">
                        {console.log(item.Product.title ,"item")}
                          <img
                            src={item.Product.imageUrl}
                            alt={item.Product.title}
                            className="w-16 h-16 object-cover rounded-xl"
                          />

                          <div>

                            <h3 className="font-semibold">
                              {item.Product.title}
                            </h3>

                            <p className="text-gray-500 text-sm">
                              Quantity: {item.quantity}
                            </p>

                          </div>

                        </div>

                        <p className="font-bold">
                          ₹{item.price}
                        </p>

                      </div>

                    ))
                  }

                </div>

                <div className="flex items-center justify-between mt-6">

                  <p className="text-lg font-bold">
                    Total: ₹{order.totalAmount}
                  </p>

                  <p className="font-medium text-gray-600">
                    {order.paymentMode}
                  </p>

                </div>

              </div>

            ))
          }

        </div>

      </div>

    </div>
  );
}