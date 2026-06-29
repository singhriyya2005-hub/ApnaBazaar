import { Link } from "react-router-dom";

function Navbar({ cartCount, isSeller }) {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-green-600">
          🛍️ ApnaBazaar
        </Link>

        <div className="flex items-center gap-5">
          <Link to="/" className="text-gray-700 hover:text-green-600">
            Home
          </Link>

          {!isSeller && (
            <>
              <Link to="/reels" className="text-gray-700 hover:text-green-600">
                🎥 Reels
              </Link>

              <Link to="/cart" className="text-gray-700 hover:text-green-600">
                🛒 Cart ({cartCount})
              </Link>
            </>
          )}

          <Link to="/profile" className="text-gray-700 hover:text-green-600">
            👤 Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;