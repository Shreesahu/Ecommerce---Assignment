import { Link } from "react-router-dom";

export default function Orders({ orders }) {

  const latestOrders =
    orders?.slice(0, 5) || [];

  return (

    <div className="space-y-4">

      {latestOrders.length === 0 ? (

        <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-500">

          No orders found

        </div>

      ) : (

        latestOrders.map((order) => (

          <div
            key={order.id}
            className="rounded-2xl border border-gray-200 p-5"
          >

            <div className="flex items-center justify-between">

              <div>

                <h3 className="text-lg font-bold">

                  Order #{order.id}

                </h3>

                <p className="text-sm text-gray-500">

                  {
                    new Date(
                      order.createdAt
                    ).toLocaleDateString()
                  }

                </p>

              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold
                ${
                  order.status === "PAID"
                    ? "bg-green-100 text-green-700"

                    : order.status === "PENDING"
                    ? "bg-yellow-100 text-yellow-700"

                    : "bg-red-100 text-red-700"
                }`}
              >

                {order.status}

              </span>

            </div>

            <div className="mt-4 space-y-3">

              {order.OrderItem?.slice(0, 2).map((item) => (

                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >

                  <div className="flex items-center gap-3">

                    <img
                      src={item.Product?.imageUrl}
                      alt={item.Product?.title}
                      className="h-14 w-14 rounded-xl object-cover"
                    />

                    <div>

                      <p className="font-medium">

                        {item.Product?.title}

                      </p>

                      <p className="text-sm text-gray-500">

                        Qty: {item.quantity}

                      </p>

                    </div>

                  </div>

                  <p className="font-semibold">

                    ₹{item.price}

                  </p>

                </div>

              ))}

            </div>

            <div className="mt-5 flex items-center justify-between border-t pt-4">

              <p className="font-bold">

                ₹{order.totalAmount}

              </p>

              <p className="text-sm text-gray-500">

                {order.paymentMode}

              </p>

            </div>

          </div>

        ))
      )}

      {orders?.length > 5 && (

        <Link
          to="/track-my-orders"
          className="block rounded-2xl bg-black py-4 text-center font-semibold text-white"
        >

          See Full Order History

        </Link>

      )}

    </div>
  );
}