import { useEffect, useState } from "react";
import { URL } from "../Constant";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addUser, removeUser } from "../Redux/ConnectionSlice";

const UserConnection = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connection);

  const fetchUser = async () => {
    try {
      const res = await axios.get(URL + "profile/connections", {
        withCredentials: true,
      });
      dispatch(addUser(res?.data?.Data || []));
    } catch (error) {
      console.error(
        "Failed to fetch connections:",
        error.response?.data || error.message,
      );
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleRemove = async (id) => {
    const user = await axios.delete(URL + "Profile/connection/delete/" + id, {
      withCredentials: true,
    });
    dispatch(removeUser(id));
    setShowPopUp(false);
  };

  if (!connections || connections.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-10">No connections found 🤝</p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex justify-center mt-6 mb-8">
        <h1
          className="
    px-6 py-3 rounded-full
    text-2xl sm:text-3xl font-bold
    bg-gradient-to-br from-pink-500 to-purple-600
    text-white
    shadow-lg
  "
        >
          💘 Your Connections ({connections.length})
        </h1>
      </div>

      {connections.map((user) => (
        <div
          key={user._id}
          className="
              w-full max-w-xl
              flex items-center justify-between
              px-4 sm:px-5
              py-3 sm:py-4
              rounded-2xl
              shadow-md hover:shadow-lg
              transition-all
              bg-white
            "
        >
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={user.photoUrl}
              alt={user.firstName}
              className="
                  w-12 h-12 sm:w-14 sm:h-14
                  rounded-full object-cover
                  border-2 border-pink-500
                "
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

          <button
            className="
                px-3 sm:px-4
                py-1.5 sm:py-2
                text-xs sm:text-sm
                font-medium
                rounded-full
                border border-red-400/40
                text-red-400
                hover:bg-red-500 hover:text-white
                transition
                cursor-pointer
              "
            onClick={() => setShowPopUp(true)}
          >
            Remove
          </button>

          {showPopUp && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/50" />
              <div className="relative w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-xl">
                <h2 className="text-lg font-semibold text-gray-900">
                  Remove connection?
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Are you sure you want to remove this connection? This action
                  cannot be undone.
                </p>
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
                    onClick={() => setShowPopUp(false)}
                  >
                    Cancel
                  </button>

                  <button
                    className="rounded-full bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 transition"
                    onClick={() => handleRemove(user._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserConnection;
