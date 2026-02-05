import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { removeUser } from "../Redux/UserSlice";
import axios from "axios";
import { URL } from "../Constant";
import { useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((store) => store.user);

  const [openMenu, setOpenMenu] = useState(false);
  const pathName = location.pathname;

  const handleLogout = async () => {
    setOpenMenu(false);
    try {
      await axios.get(URL + "user/logout", { withCredentials: true });
    } catch (err) {
      console.log("Logout API failed, clearing client state anyway");
    } finally {
      dispatch(removeUser());
      navigate("/login");
    }
  };
  useEffect(() => {
    if (user && (pathName === "/login" || pathName === "/signup")) {
      navigate("/", { replace: true });
    }
  }, [user, pathName, navigate]);
  if (loading) return null;

  return (
    <div className="w-full bg-gradient-to-br from-pink-500 to-purple-500 text-white">
      <nav className="flex items-center justify-between px-4 sm:px-8 lg:px-16 py-4">
        <Link to="/">
          <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            ❤️ MatchUp
          </h1>
        </Link>

        {!user && pathName !== "/login" && pathName !== "/signup" && (
          <div className="flex gap-2 sm:gap-4">
            <Link to={"/login"}>
              <button className="px-4 py-2 text-sm rounded-full border border-white/30">
                Login
              </button>
            </Link>
            <Link to={"/signup"}>
              <button className="px-4 sm:px-5 py-2 text-sm rounded-full bg-pink-500 hover:bg-pink-600">
                Sign Up
              </button>
            </Link>
          </div>
        )}

        {user && (
          <div className="relative flex items-center gap-3">
            <p className="hidden sm:block font-semibold">
              Welcome, {user?.Data?.firstName}
            </p>

            <div
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-white cursor-pointer"
              onClick={() => setOpenMenu((prev) => !prev)}
            >
              <img
                src={user?.Data?.photoUrl || "/default-avatar.png"}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>

            {openMenu && (
              <div
                className="
          absolute 
          right-0 
          top-full 
          mt-3 
          w-52 
          bg-white 
          text-gray-800 
          rounded-xl 
          shadow-2xl 
          overflow-hidden 
          z-50
        "
              >
                <button
                  onClick={() => {
                    setOpenMenu(false);
                    navigate("/profile");
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-pink-50 transition"
                >
                  👤 Profile
                </button>

                <button
                  onClick={() => {
                    setOpenMenu(false);
                    navigate("/userconnections");
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-pink-50 transition"
                >
                  ❤️ Connections
                </button>

                <button
                  onClick={() => {
                    setOpenMenu(false);
                    navigate("/requests");
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-pink-50 transition"
                >
                  📩 Connection Requests
                </button>

                <div className="border-t" />

                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 text-left text-red-500 hover:bg-red-50 transition"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
