import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        const foundProduct = data.find(
          (item) => item.id === Number(id)
        );

        setProduct(foundProduct);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching product:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="p-10 text-center">Loading product...</div>;
  }

  if (!product) {
    return <div className="p-10 text-center">Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Link
        to="/"
        className="inline-flex items-center mb-6 bg-white px-4 py-2 rounded-lg shadow hover:bg-gray-100"
      >
        ← Back to Home
      </Link>

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />

          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-800">
              {product.name}
            </h1>

            <p className="text-gray-500 mt-2 text-lg">{product.shop}</p>

            <div className="mt-4 flex gap-4 items-center">
              <span className="text-yellow-500 font-semibold">
                ⭐ {product.rating}
              </span>

              <span className="text-green-600 font-medium">
                ✅ In Stock
              </span>
            </div>

            <p className="text-3xl font-bold text-green-600 mt-6">
              ₹{product.price}
            </p>

            <p className="text-gray-700 mt-4">
              <strong>Category:</strong> {product.category}
            </p>

            <p className="text-gray-700 mt-2">
              <strong>Delivery:</strong> 🚚 {product.delivery || "10-20 mins"}
            </p>

            <p className="text-gray-600 mt-6">
              {product.description ||
                "Quality product available from trusted local shops."}
            </p>

            <button
              onClick={() => addToCart(product)}
              className="mt-8 w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition"
            >
              🛒 Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;