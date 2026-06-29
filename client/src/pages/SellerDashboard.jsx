import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SellerDashboard() {
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

  const reelsUploaded = products.filter(
    (product) => product.reel && product.reel.trim() !== ""
  ).length;

  const totalRevenue = orders.reduce(
    (sum, order) => sum + (order.totalAmount || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Link
        to="/profile"
        className="inline-block mb-6 bg-white px-4 py-2 rounded-lg shadow hover:bg-gray-100"
      >
        ← Back to Profile
      </Link>

      <h1 className="text-3xl font-bold mb-6">
        🏪 Seller Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Total Products</p>
          <h2 className="text-3xl font-bold text-green-600">
            {products.length}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Orders Received</p>
          <h2 className="text-3xl font-bold text-blue-600">
            {orders.length}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Reels Uploaded</p>
          <h2 className="text-3xl font-bold text-pink-600">
            {reelsUploaded}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Total Revenue</p>
          <h2 className="text-3xl font-bold text-green-700">
            ₹{totalRevenue}
          </h2>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Link
          to="/seller/products"
          className="bg-white p-8 rounded-xl shadow hover:shadow-lg"
        >
          🛍 My Products
          <p className="text-gray-500 mt-2">
            Add, view and delete your products.
          </p>
        </Link>

        <Link
          to="/seller/orders"
          className="bg-white p-8 rounded-xl shadow hover:shadow-lg"
        >
          📦 Orders Received
          <p className="text-gray-500 mt-2">
            View customer orders for your shop.
          </p>
        </Link>

        <Link
          to="/seller/reels"
          className="bg-white p-8 rounded-xl shadow hover:shadow-lg"
        >
          🎥 Reels Uploaded
          <p className="text-gray-500 mt-2">
            Manage product reels and promotions.
          </p>
        </Link>

        <Link
          to="/seller/revenue"
          className="bg-white p-8 rounded-xl shadow hover:shadow-lg"
        >
          💰 Revenue Analytics
          <p className="text-gray-500 mt-2">
            Daily and monthly sales overview.
          </p>
        </Link>
      </div>
    </div>
  );
}

export default SellerDashboard;