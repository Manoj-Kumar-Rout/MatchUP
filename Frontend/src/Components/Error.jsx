import { useNavigate } from "react-router-dom";

const Error = ({ title, message, status }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        {status && (
          <h2 className="text-6xl font-bold text-indigo-600 mb-2">{status}</h2>
        )}

        <h1 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h1>

        <p className="text-gray-600 mb-6">{message}</p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
          >
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="px-5 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
