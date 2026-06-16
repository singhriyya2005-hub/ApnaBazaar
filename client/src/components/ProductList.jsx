import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function ProductList({ addToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <section className="products">
      <h2>Trending Products Near You</h2>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            addToCart={addToCart}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductList;