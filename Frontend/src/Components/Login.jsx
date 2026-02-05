import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Error from "./Error";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("manoj@gmail.com");
  const [password, setPassword] = useState("Abcd@1234");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/user/login",
        { email, password },
        { withCredentials: true },
      );
      console.log(res);
      setError(null);
      navigate("/feed");
    } catch (err) {
      setError({
        status: err.response?.status,
        message:
          err.response?.data?.message || "Login failed. Please try again.",
      });
    }
  };

  if (error) {
    return (
      <Error
        status={error.status}
        title="Unauthorized"
        message={error.message}
      />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 px-4">
      <div className="w-full max-w-md bg-amber-50 rounded-2xl shadow-xl p-6 sm:p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Welcome Back ❤️
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Login to continue matching
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 m-3">
          <h1 className="text-sm text-gray-600">Email</h1>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 px-4 py-2 rounded-lg border focus:border-2"
          />

          <h1 className="text-sm text-gray-600 pt-3">Password</h1>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 px-4 py-2 rounded-lg border focus:border-2"
          />

          <button
            className="w-full mt-4 py-2 rounded-lg bg-pink-500 text-white font-semibold hover:bg-pink-600 transition"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?
          <Link to="/signup">
            <span className="text-pink-500 font-medium cursor-pointer hover:underline ml-1">
              Sign up
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
