import { Link } from "react-router-dom";

function Wishlist({ wishlist, removeFromWishlist }) {
  return (
    <div className="min-h-screen bg-gray-50 p-8">

      <Link
        to="/profile"
        className="inline-block mb-6 bg-white px-4 py-2 rounded-lg shadow hover:bg-gray-100"
      >
        ← Back to Profile
      </Link>

      <h1 className="text-3xl font-bold mb-6">
        ❤️ Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow">
          No products saved yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {wishlist.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h3 className="font-bold text-lg">
                  {item.name}
                </h3>

                <p className="text-gray-500">
                  {item.shop}
                </p>

                <p className="text-green-600 font-bold mt-2">
                  ₹{item.price}
                </p>

                <button
                  onClick={() => removeFromWishlist(index)}
                  className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                >
                  Remove ❤️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;