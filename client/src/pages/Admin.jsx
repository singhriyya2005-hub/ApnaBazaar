import { useEffect, useState } from "react";

function Admin({ cartCount, wishlistCount }) {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log("Products error:", error));

    fetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((error) => console.log("Orders error:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8">
        📊 Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Total Products</h2>
          <p className="text-3xl font-bold text-green-600">
            {products.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Total Orders</h2>
          <p className="text-3xl font-bold text-blue-600">
            {orders.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Cart Items</h2>
          <p className="text-3xl font-bold text-purple-600">
            {cartCount}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Wishlist Items</h2>
          <p className="text-3xl font-bold text-pink-600">
            {wishlistCount}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">
          Recent Orders
        </h2>

        {orders.length === 0 ? (
          <p className="text-gray-500">No orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg"
              >
                <p className="font-bold">
                  Order ID: {order.orderId}
                </p>
                <p>Customer: {order.name}</p>
                <p>Status: {order.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;