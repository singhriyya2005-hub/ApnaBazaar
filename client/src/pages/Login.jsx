import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login({ loginUser }) {
  const [role, setRole] = useState("customer");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    const loginData = {
      email: formData.get("email"),
      password: formData.get("password"),
      role,
    };

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.message || "Login failed");
        setLoading(false);
        return;
      }

      loginUser(data.user);

      alert("Logged in successfully!");
      navigate("/profile");
    } catch (error) {
      console.log("Login error:", error);
      alert("Something went wrong during login.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">
        <Link
          to="/profile"
          className="inline-block mb-6 text-green-600 hover:underline"
        >
          ← Back to Profile
        </Link>

        <h1 className="text-3xl font-bold mb-2">
          Login to ApnaBazaar
        </h1>

        <p className="text-gray-500 mb-6">
          Continue shopping or manage your seller account.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-lg"
            required
          />

          <div>
            <p className="font-semibold mb-2">Login as</p>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("customer")}
                className={`p-3 rounded-lg border ${
                  role === "customer" ? "bg-green-600 text-white" : "bg-white"
                }`}
              >
                🛒 Customer
              </button>

              <button
                type="button"
                onClick={() => setRole("seller")}
                className={`p-3 rounded-lg border ${
                  role === "seller" ? "bg-green-600 text-white" : "bg-white"
                }`}
              >
                🏪 Seller
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-green-600 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;