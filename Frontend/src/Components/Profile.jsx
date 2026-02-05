import { useSelector } from "react-redux";
import ProfileCard from "./ProfileCard";

const Profile = () => {
  const user = useSelector((state) => state.user?.user?.Data);
  const loading = useSelector((state) => state.user?.loading);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">Loading profile...</div>
    );
  }

  if (!user) {
    return <div className="p-6 text-center text-red-500">User not found</div>;
  }

  return (
    <>
      <div className="min-h-[60vh] px-4 sm:px-8 lg:px-16 py-6">
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
            💘 Your Profile
          </h1>
        </div>

        <ProfileCard user={user} />
      </div>
    </>
  );
};

export default Profile;
