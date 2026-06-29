import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SellerRevenue() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((error) => console.log("Revenue error:", error));
  }, []);

  const today = new Date();

  const todayOrders = orders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    return orderDate.toDateString() === today.toDateString();
  });

  const monthlyOrders = orders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    return (
      orderDate.getMonth() === today.getMonth() &&
      orderDate.getFullYear() === today.getFullYear()
    );
  });

  const totalRevenue = orders.reduce(
    (sum, order) => sum + (order.totalAmount || 0),
    0
  );

  const todayRevenue = todayOrders.reduce(
    (sum, order) => sum + (order.totalAmount || 0),
    0
  );

  const monthlyRevenue = monthlyOrders.reduce(
    (sum, order) => sum + (order.totalAmount || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Link
        to="/seller"
        className="inline-block mb-6 bg-white px-4 py-2 rounded-lg shadow hover:bg-gray-100"
      >
        ← Back to Seller Dashboard
      </Link>

      <h1 className="text-3xl font-bold mb-6">
        💰 Revenue Analytics
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Today&apos;s Sales</p>
          <h2 className="text-3xl font-bold text-blue-600">
            {todayOrders.length}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Today&apos;s Revenue</p>
          <h2 className="text-3xl font-bold text-green-600">
            ₹{todayRevenue}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Monthly Sales</p>
          <h2 className="text-3xl font-bold text-purple-600">
            {monthlyOrders.length}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Monthly Revenue</p>
          <h2 className="text-3xl font-bold text-green-700">
            ₹{monthlyRevenue}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Total Orders</p>
          <h2 className="text-3xl font-bold text-orange-600">
            {orders.length}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Total Revenue</p>
          <h2 className="text-3xl font-bold text-green-800">
            ₹{totalRevenue}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default SellerRevenue;