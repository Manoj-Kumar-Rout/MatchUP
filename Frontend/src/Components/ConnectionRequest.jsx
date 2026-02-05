import React from "react";

const ConnectionRequest = () => {
  const requests = [
    {
      _id: "1",
      firstName: "Rahul",
      age: 26,
      location: "Bangalore",
      photoUrl: "https://i.pravatar.cc/150?img=12",
    },
    {
      _id: "2",
      firstName: "Anita",
      age: 24,
      location: "Mumbai",
      photoUrl: "https://i.pravatar.cc/150?img=32",
    },
  ];

  return (
    <div className="flex flex-col items-center gap-4 px-3 sm:px-0">
      <h2 className="text-lg font-semibold text-gray-700">
        Connection Requests ({requests.length})
      </h2>

      {requests.map((user) => (
        <div
          key={user._id}
          className="w-full max-w-xl flex items-center justify-between
                     px-4 sm:px-5 py-3 sm:py-4 rounded-2xl
                     shadow-md hover:shadow-lg transition-all bg-white"
        >
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={user.photoUrl}
              alt={user.firstName}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-indigo-500"
            />

            <div className="min-w-0">
              <h3 className="text-black font-semibold truncate">
                {user.firstName}, {user.age}
              </h3>
              <p className="text-gray-400 text-sm truncate">
                📍 {user.location}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm
                         font-medium rounded-full border border-gray-300
                         text-gray-600 hover:bg-gray-100 transition"
            >
              Reject
            </button>

            <button
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm
                         font-medium rounded-full bg-indigo-500 text-white
                         hover:bg-indigo-600 transition"
            >
              Accept
            </button>
          </div>
        </div>
      ))}

      {requests.length === 0 && (
        <p className="text-gray-400 text-sm mt-10">
          No pending connection requests 📨
        </p>
      )}
    </div>
  );
};

export default ConnectionRequest;
