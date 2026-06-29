import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SellerProducts() {
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log("Fetch products error:", error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const newProduct = {
      name: formData.get("name"),
      price: formData.get("price"),
      description: formData.get("description"),
      category: formData.get("category"),
      shop: formData.get("shop"),
      image: formData.get("image"),
      reel: formData.get("reel"),
    };

    try {
      await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      fetchProducts();

      alert("Product added successfully!");
      e.target.reset();
    } catch (error) {
      console.log("Product add error:", error);
      alert("Failed to add product.");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });

      fetchProducts();

      alert("Product deleted successfully!");
    } catch (error) {
      console.log("Delete product error:", error);
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Link
        to="/seller"
        className="inline-block mb-6 bg-white px-4 py-2 rounded-lg shadow hover:bg-gray-100"
      >
        ← Back to Seller Dashboard
      </Link>

      <h1 className="text-3xl font-bold mb-6">
        🛍 My Products
      </h1>

      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Add Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Product Name"
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            name="price"
            placeholder="Price"
            className="w-full border p-3 rounded-lg"
            required
          />

          <textarea
            name="description"
            placeholder="Product Description"
            className="w-full border p-3 rounded-lg"
            rows="3"
            required
          />

          <input
            name="shop"
            placeholder="Shop Name"
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            name="category"
            placeholder="Category"
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            name="image"
            placeholder="Image URL"
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            name="reel"
            placeholder="Optional Reel / Video URL"
            className="w-full border p-3 rounded-lg"
          />

          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
            Add Product
          </button>
        </form>
      </div>

      {products.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow text-gray-500">
          No products added yet.
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-48 w-full object-cover"
              />

              <div className="p-4">
                <h3 className="font-bold text-lg">
                  {product.name}
                </h3>

                <p className="text-gray-500">
                  {product.shop}
                </p>

                <p className="text-green-600 font-bold">
                  ₹{product.price}
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  {product.category}
                </p>

                {product.reel && (
                  <a
                    href={product.reel}
                    target="_blank"
                    rel="noreferrer"
                    className="block mt-3 text-blue-600"
                  >
                    🎥 View Reel
                  </a>
                )}

                <button
                  onClick={() => deleteProduct(product.id)}
                  className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                >
                  Delete Product
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SellerProducts;