import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SellerReels() {
  const [reels, setReels] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        const productsWithReels = data.filter(
          (product) => product.reel && product.reel.trim() !== ""
        );

        setReels(productsWithReels);
      })
      .catch((error) =>
        console.log("Reels fetch error:", error)
      );
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
        🎥 Reels Uploaded
      </h1>

      {reels.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow text-gray-500">
          No reels uploaded yet.
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {reels.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover"
              />

              <div className="p-4">
                <h2 className="font-bold text-lg">
                  {product.name}
                </h2>

                <p className="text-gray-500">
                  {product.shop}
                </p>

                <p className="text-green-600 font-bold mt-2">
                  ₹{product.price}
                </p>

                <a
                  href={product.reel}
                  target="_blank"
                  rel="noreferrer"
                  className="block mt-4 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700"
                >
                  🎥 View Reel
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SellerReels;