import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Home({ addToCart, addToWishlist }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const stores = [
    {
      name: "Amul Store",
      type: "Dairy",
      distance: "0.8 km",
      delivery: "10 mins",
    },
    {
      name: "Fresh Bakery",
      type: "Bakery",
      distance: "1.2 km",
      delivery: "15 mins",
    },
    {
      name: "Patel Fruits Store",
      type: "Fruits",
      distance: "1.5 km",
      delivery: "20 mins",
    },
  ];

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.shop?.toLowerCase().includes(search.toLowerCase()) ||
      product.category?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-green-600 text-white px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm mb-2">📍 Delivering to</p>

          <h1 className="text-4xl font-bold">
            Vadodara Local Bazaar
          </h1>

          <p className="mt-3 text-green-100">
            Find nearby shops, trending products and fast local delivery.
          </p>

          <div className="mt-6">
            <input
              type="text"
              placeholder="Search milk, bakery, fruits, pharmacy..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-2xl px-5 py-4 rounded-xl text-gray-800 shadow focus:outline-none"
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-8">
        <h2 className="text-2xl font-bold mb-4">
          🧺 Shop by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { name: "All", icon: "🛍️" },
            { name: "Groceries", icon: "🥬" },
            { name: "Electronics", icon: "📱" },
            { name: "Fashion", icon: "👕" },
            { name: "Pharmacy", icon: "💊" },
          ].map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`bg-white p-5 rounded-xl shadow hover:shadow-lg ${
                selectedCategory === category.name
                  ? "ring-2 ring-green-500"
                  : ""
              }`}
            >
              <div className="text-2xl">{category.icon}</div>
              <p className="font-semibold mt-2">{category.name}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="px-6 pb-8">
        <h2 className="text-2xl font-bold mb-4">
          🏪 Stores Near You
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {stores.map((store, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg"
            >
              <h3 className="font-bold text-lg">{store.name}</h3>
              <p className="text-gray-500">{store.type}</p>

              <div className="flex justify-between mt-4 text-sm">
                <span>📍 {store.distance}</span>
                <span>🚚 {store.delivery}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-20">
        <h2 className="text-2xl font-bold mb-6">
          🔥 Trending Products Near You
        </h2>

        {loading ? (
          <p className="text-gray-600">Loading products...</p>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow">
            No products found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
              >
                <Link to={`/products/${product.id}`}>
                  <img
                    src={
                      product.image ||
                      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800"
                    }
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-4">
                    <h3 className="font-bold text-lg">{product.name}</h3>

                    <p className="text-gray-500">
                      {product.shop || "Local Store"}
                    </p>

                    <p className="text-yellow-500 font-semibold">
                      ⭐ {product.rating || 4.5}
                    </p>

                    <p className="text-green-600 font-bold mt-2">
                      ₹{product.price}
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                      {product.category || "Groceries"}
                    </p>
                  </div>
                </Link>

                <div className="px-4 pb-4 flex gap-2">
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() => addToWishlist(product)}
                    className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600"
                  >
                    ❤️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="bg-white py-6 text-center text-gray-500 border-t">
        © 2026 ApnaBazaar. Supporting Local Businesses ❤️
      </footer>
    </div>
  );
}

export default Home;