import { useEffect, useState } from "react";
import axios from "axios";

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await axios.get("http://localhost:5000/user/connections", {
          withCredentials: true,
        });
        setConnections(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch connections", err);
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading connections...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-8 lg:px-16 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 m-auto">
        ❤️ Your Connections
      </h1>

      {connections.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          <p className="text-lg">No connections yet</p>
          <p className="text-sm mt-2">
            Start matching to build your network 💕
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((user) => (
            <div
              key={user._id}
              className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-4"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden border">
                <img
                  src={user.photoUrl}
                  alt={user.firstName}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-800">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm text-gray-500">
                  {user.location || "India"}
                </p>
              </div>

              <button className="text-sm px-3 py-1 rounded-full bg-pink-500 text-white hover:bg-pink-600">
                View
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Connections;
