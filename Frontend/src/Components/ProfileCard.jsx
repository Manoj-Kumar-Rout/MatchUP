import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { URL } from "../Constant";
import { removeUserFromFeed } from "../Redux/FeedSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
const ProfileCard = ({ user }) => {
  const dispatch = useDispatch();
  const { _id, firstName, age, Bio, photoUrl, location: userLocation } = user;

  const { pathname } = useLocation();
  const handelConnection = async (status, _id) => {
    try {
      const res = await axios.post(
        `${URL}connection/send/${status}/${_id}`,
        {},
        {
          withCredentials: true,
        },
      );
      dispatch(removeUserFromFeed(_id));
    } catch (error) {
      console.error(
        "Error sending connection:",
        error.response?.data || error.message,
      );
    }
  };

  return (
    <div className="flex items-center justify-center w-full px-4 py-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="
          w-full max-w-[22rem] sm:max-w-[24rem] md:max-w-[26rem]
          rounded-3xl shadow-2xl overflow-hidden
          bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500
        "
      >
        <div className="relative h-[22rem] sm:h-[26rem] w-full">
          <img
            src={photoUrl || "/default-avatar.png"}
            alt={firstName}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/30" />

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
              {firstName}, {age}
            </h2>

            {userLocation && (
              <p className="text-sm opacity-90 mt-1">📍 {userLocation}</p>
            )}
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-md px-4 sm:px-5 py-4">
          <p className="text-gray-700 text-sm sm:text-base line-clamp-3">
            {Bio || "No bio available"}
          </p>

          {pathname === "/feed" && (
            <div className="flex items-center justify-between mt-6 px-2">
              <button
                onClick={() => {
                  handelConnection("Ignored", _id);
                }}
                className="
                  w-12 h-12 sm:w-14 sm:h-14
                  rounded-full border-2 border-red-400
                  text-red-500 text-xl
                  hover:bg-red-50 active:scale-95
                  transition
                "
              >
                ❌
              </button>

              <button
                onClick={() => {
                  handelConnection("Interested", _id);
                }}
                className="
                  w-14 h-14 sm:w-16 sm:h-16
                  rounded-full
                  bg-gradient-to-br from-pink-500 to-purple-600
                  text-white text-2xl
                  hover:scale-105 active:scale-95
                  shadow-lg hover:shadow-xl
                  transition
                "
              >
                ❤️
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileCard;
