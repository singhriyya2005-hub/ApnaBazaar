import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Reels({ addToCart }) {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        const productsWithReels = data.filter(
          (product) => product.reel && product.reel.trim() !== ""
        );

        setReels(productsWithReels);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Reels fetch error:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Link
        to="/"
        className="inline-block mb-6 bg-white px-4 py-2 rounded-lg shadow hover:bg-gray-100"
      >
        ← Back to Home
      </Link>

      <h1 className="text-3xl font-bold mb-2">
        🎥 Trending Product Reels
      </h1>

      <p className="text-gray-600 mb-8">
        Watch nearby seller promotions and shop directly from reels.
      </p>

      {loading ? (
        <div className="bg-white p-6 rounded-xl shadow">
          Loading reels...
        </div>
      ) : reels.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow text-gray-500">
          No seller reels uploaded yet.
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {reels.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-72 object-cover"
                />

                <span className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                  🔥 Trending
                </span>

                <a
                  href={product.reel}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute bottom-3 right-3 bg-black text-white px-3 py-1 rounded-full text-sm"
                >
                  ▶ Reel
                </a>
              </div>

              <div className="p-4">
                <h2 className="text-xl font-bold">
                  {product.name}
                </h2>

                <p className="text-gray-500">
                  {product.shop || "Local Store"}
                </p>

                <p className="text-sm text-gray-400">
                  {product.category || "Local Product"}
                </p>

                <p className="text-green-600 font-bold mt-2">
                  ₹{product.price}
                </p>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                  >
                    Add to Cart
                  </button>

                  <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600">
                    ❤️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Reels;