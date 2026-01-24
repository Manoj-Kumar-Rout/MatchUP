import { useNavigate, Link, useLocation } from "react-router-dom";
const Navbar = () => {
  const Navigate = useNavigate();

  const handelLogin = () => {
    Navigate("/login");
  };
  const handelSignup = () => {
    Navigate("/signup");
  };

  const user = false;

  const location = useLocation();
  const pathName = location.pathname;
  return (
    <>
      <div className="w-full bg-gradient-to-br from-pink-500 to-purple-500  text-white">
        <nav className="flex items-center justify-between px-4 sm:px-8 lg:px-16 py-4">
          <Link to={"/"}>
            <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              ❤️ MatchUp
            </h1>
          </Link>
          {!user && pathName != "/login" && pathName != "/signup" && (
            <div className="flex gap-2 sm:gap-4">
              <button
                className="px-4 py-2 text-sm rounded-full border border-white/30"
                onClick={handelLogin}
              >
                Login
              </button>
              <button
                className="px-4 sm:px-5 py-2 text-sm rounded-full bg-pink-500 hover:bg-pink-600"
                onClick={handelSignup}
              >
                Sign Up
              </button>
            </div>
          )}
          {user && (
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-500 cursor-pointer">
              <img
                src={"https://i.pravatar.cc/150"}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
