import { Link } from "react-router-dom";

function Profile({
  currentUser,
  isSeller,
  toggleSellerMode,
  logoutUser,
}) {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Link
        to="/"
        className="inline-block mb-6 bg-white px-4 py-2 rounded-lg shadow hover:bg-gray-100"
      >
        ← Back to Home
      </Link>

      <h1 className="text-3xl font-bold mb-6">
        👤 My Profile
      </h1>

      <div className="bg-white p-6 rounded-xl shadow mb-6">
        {currentUser ? (
          <>
            <h2 className="text-xl font-bold mb-2">
              Welcome, {currentUser.name}
            </h2>

            <p className="text-gray-600">
              📧 {currentUser.email}
            </p>

            <p className="text-gray-600">
              📱 {currentUser.phone}
            </p>

            <p className="text-gray-600">
              🎭 Role: {isSeller ? "Seller" : "Customer"}
            </p>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-2">
              Welcome to ApnaBazaar
            </h2>

            <p className="text-gray-600">
              Login or register to manage your shopping and seller account.
            </p>
          </>
        )}

        <div className="mt-4 inline-block bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold">
          Current Mode: {isSeller ? "🏪 Seller" : "🛒 Customer"}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {!currentUser && (
          <>
            <Link
              to="/login"
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg"
            >
              🔐 Login
            </Link>

            <Link
              to="/register"
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg"
            >
              📝 Register
            </Link>
          </>
        )}

        {currentUser && !isSeller && (
          <>
            <Link
              to="/orders"
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg"
            >
              📦 My Orders & Status
            </Link>

            <Link
              to="/wishlist"
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg"
            >
              ❤️ My Wishlist
            </Link>
          </>
        )}

        {currentUser && isSeller && (
          <>
            <Link
              to="/seller"
              className="bg-green-600 text-white p-6 rounded-xl shadow hover:bg-green-700"
            >
              🏪 Seller Dashboard
            </Link>

            <Link
              to="/seller/orders"
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg"
            >
              📦 Orders Received
            </Link>

            <Link
              to="/seller/products"
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg"
            >
              🛍 My Listed Products
            </Link>
          </>
        )}

        {currentUser && (
          <button
            onClick={toggleSellerMode}
            className={`px-6 py-4 rounded-xl shadow text-white font-semibold ${
              isSeller
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-yellow-500 hover:bg-yellow-600"
            }`}
          >
            {isSeller ? "🛒 Switch to Customer" : "🏪 Switch to Seller"}
          </button>
        )}
      </div>

      {currentUser && (
        <button
          onClick={logoutUser}
          className="mt-8 w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600"
        >
          🚪 Logout
        </button>
      )}
    </div>
  );
}

export default Profile;