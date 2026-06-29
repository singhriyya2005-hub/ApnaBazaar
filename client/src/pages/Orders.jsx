import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((error) => console.log("Orders error:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      <Link
        to="/profile"
        className="inline-block mb-6 bg-white px-4 py-2 rounded-lg shadow hover:bg-gray-100"
      >
        ← Back to Profile
      </Link>

      <h1 className="text-3xl font-bold mb-6">
        📦 My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow">
          No orders placed yet.
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow"
            >
              <h2 className="font-bold text-lg">
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

              <p className="text-green-600 font-semibold mt-2">
                Status: {order.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;