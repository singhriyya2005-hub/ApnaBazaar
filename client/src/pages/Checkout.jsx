import { useState } from "react";
import { Link } from "react-router-dom";

function Checkout({ cart, clearCart }) {
  const [placed, setPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setLoading(true);

    const generatedOrderId =
      "ABZ-" + Math.floor(100000 + Math.random() * 900000);

    const formData = new FormData(e.target);

    const orderData = {
      orderId: generatedOrderId,
      name: formData.get("name"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      items: cart,
      totalAmount: totalAmount,
      status: "Placed",
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      console.log("Order response:", data);

      setOrderId(generatedOrderId);
      setPlaced(true);
      clearCart();
    } catch (error) {
      console.log("Order error:", error);
      alert("Something went wrong while placing order.");
    }

    setLoading(false);
  };

  if (placed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white p-10 rounded-xl shadow-lg text-center max-w-md">
          <h1 className="text-4xl font-bold text-green-600">
            🎉 Order Placed Successfully!
          </h1>

          <p className="mt-4 text-gray-600">
            Thank you for shopping with ApnaBazaar.
          </p>

          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
            <p className="font-semibold">Order ID</p>
            <p className="text-green-600 font-bold">{orderId}</p>
          </div>

          <Link
            to="/"
            className="inline-block mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">
        <Link
          to="/cart"
          className="inline-block mb-6 text-green-600 hover:underline"
        >
          ← Back to Cart
        </Link>

        <h1 className="text-3xl font-bold mb-6">
          Checkout
        </h1>

        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <p className="font-semibold">Order Summary</p>
          <p>Total Items: {cart.length}</p>
          <p className="text-green-600 font-bold">
            Total Amount: ₹{totalAmount}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            name="phone"
            type="text"
            placeholder="Phone Number"
            className="w-full border p-3 rounded-lg"
            required
          />

          <textarea
            name="address"
            placeholder="Delivery Address"
            className="w-full border p-3 rounded-lg"
            rows="4"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;