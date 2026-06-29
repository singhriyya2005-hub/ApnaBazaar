import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SellerOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((error) => console.log("Seller orders error:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Link
        to="/seller"
        className="inline-block mb-6 bg-white px-4 py-2 rounded-lg shadow hover:bg-gray-100"
      >
        ← Back to Seller Dashboard
      </Link>

      <h1 className="text-3xl font-bold mb-6">
        📦 Orders Received
      </h1>

      {orders.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow text-gray-500">
          No orders received yet.
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold">
                    Order ID: {order.orderId}
                  </h2>

                  <p className="text-gray-600 mt-2">
                    Customer: {order.name}
                  </p>

                  <p className="text-gray-600">
                    Phone: {order.phone}
                  </p>

                  <p className="text-gray-600">
                    Address: {order.address}
                  </p>
                </div>

                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold">
                  {order.status}
                </span>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-bold mb-3">
                  Ordered Items
                </h3>

                {order.items?.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex justify-between border-b py-2"
                  >
                    <div>
                      <p className="font-semibold">
                        {item.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="font-bold text-green-600">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-right text-xl font-bold text-green-600">
                Total: ₹{order.totalAmount}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SellerOrders;