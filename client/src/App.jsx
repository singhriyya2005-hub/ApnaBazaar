import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Reels from "./pages/Reels";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import SellerDashboard from "./pages/SellerDashboard";
import SellerProducts from "./pages/SellerProducts";
import SellerOrders from "./pages/SellerOrders";
import SellerReels from "./pages/SellerReels";
import SellerRevenue from "./pages/SellerRevenue";

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const [isSeller, setIsSeller] = useState(() => {
    const savedSeller = localStorage.getItem("isSeller");
    return savedSeller ? JSON.parse(savedSeller) : false;
  });

  const loginUser = (user) => {
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));

    const sellerMode = user.role === "seller";
    setIsSeller(sellerMode);
    localStorage.setItem("isSeller", JSON.stringify(sellerMode));
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setIsSeller(false);

    localStorage.removeItem("currentUser");
    localStorage.setItem("isSeller", JSON.stringify(false));
  };

  const toggleSellerMode = () => {
    const newMode = !isSeller;
    setIsSeller(newMode);
    localStorage.setItem("isSeller", JSON.stringify(newMode));
  };

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const addToWishlist = (product) => {
    const alreadyExists = wishlist.find((item) => item.id === product.id);

    if (!alreadyExists) {
      setWishlist([...wishlist, product]);
    }
  };

  const removeFromWishlist = (indexToRemove) => {
    setWishlist(wishlist.filter((_, index) => index !== indexToRemove));
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <>
      <Navbar cartCount={cart.length} isSeller={isSeller} />

      <Routes>
        <Route
          path="/"
          element={<Home addToCart={addToCart} addToWishlist={addToWishlist} />}
        />

        <Route
          path="/profile"
          element={
            <Profile
              currentUser={currentUser}
              isSeller={isSeller}
              toggleSellerMode={toggleSellerMode}
              logoutUser={logoutUser}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
          }
        />

        <Route
  path="/checkout"
  element={
    <Checkout
      cart={cart}
      clearCart={clearCart}
    />
  }
/>

        <Route
          path="/wishlist"
          element={
            <Wishlist
              wishlist={wishlist}
              removeFromWishlist={removeFromWishlist}
            />
          }
        />

        <Route path="/reels" element={<Reels addToCart={addToCart} />} />
        <Route path="/orders" element={<Orders />} />

        <Route
          path="/products/:id"
          element={<ProductDetails addToCart={addToCart} />}
        />

        <Route
          path="/admin"
          element={
            <Admin cartCount={cart.length} wishlistCount={wishlist.length} />
          }
        />

        <Route path="/seller" element={<SellerDashboard />} />
        <Route path="/seller/products" element={<SellerProducts />} />
        <Route path="/seller/orders" element={<SellerOrders />} />
        <Route path="/seller/reels" element={<SellerReels />} />
        <Route path="/seller/revenue" element={<SellerRevenue />} />

        <Route path="/login" element={<Login loginUser={loginUser} />} />
        <Route path="/register" element={<Register loginUser={loginUser} />} />
      </Routes>
    </>
  );
}

export default App;