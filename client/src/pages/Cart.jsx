function Cart({
  cart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
}) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">
        🛒 Your Cart
      </h1>

      {cart.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-6">
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold text-lg">
                    {item.name}
                  </h3>

                  <p className="text-green-600">
                    ₹{item.price} each
                  </p>

                  <p className="mt-2 font-medium">
                    Subtotal: ₹
                    {item.price * item.quantity}
                  </p>

                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                      className="bg-gray-200 px-3 py-1 rounded"
                    >
                      -
                    </button>

                    <span className="font-bold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-white p-6 rounded-xl shadow">
  <h2 className="text-2xl font-bold">
    Total: ₹{total}
  </h2>

  <a
    href="/checkout"
    className="block mt-4 bg-green-600 text-white text-center py-3 rounded-lg hover:bg-green-700"
  >
    Proceed to Checkout
  </a>
</div>
        </>
      )}
    </div>
  );
}

export default Cart;