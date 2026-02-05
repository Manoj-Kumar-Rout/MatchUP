import { useEffect } from "react";
import ProfileCard from "./ProfileCard";
import axios from "axios";
import { URL } from "../Constant";
import { useDispatch, useSelector } from "react-redux";
import { setFeedUsers, nextCard, setLoading } from "../Redux/FeedSlice";

const BATCH_SIZE = 10;

const Feed = () => {
  const dispatch = useDispatch();
  const { users, currentIndex, loading } = useSelector((state) => state.feed);

  const fetchFeedUsers = async () => {
    dispatch(setLoading());
    try {
      const res = await axios.get(`${URL}feed?limit=${BATCH_SIZE}`, {
        withCredentials: true,
      });
      dispatch(setFeedUsers(res.data.data));
    } catch (err) {
      console.error("Feed fetch failed:", err);
    }
  };

  useEffect(() => {
    if (!users.length) {
      fetchFeedUsers();
    }
  }, []);

  useEffect(() => {
    if (currentIndex >= users.length && !loading) {
      fetchFeedUsers();
    }
  }, [currentIndex, users.length]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Loading profiles...
      </div>
    );
  }

  const currentUser = users[currentIndex];

  if (!currentUser) {
    return null; 
  }

  return (
    <>
      <div className="flex justify-center mt-6 mb-8">
        <h1 className="px-6 py-3 rounded-full text-2xl font-bold bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-lg">
          💘 Discover
        </h1>
      </div>

      <ProfileCard user={currentUser} onAction={() => dispatch(nextCard())} />
    </>
  );
};

export default Feed;
