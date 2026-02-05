import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const LandingPage = () => {
  const navigate = useNavigate();

  const { user, loading } = useSelector((store) => store.user);

  if (loading) return null;

  return (
    <div className="w-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 text-white">
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-4 sm:px-8 lg:px-16 py-12 lg:py-24 gap-12">
        <motion.div
          className="w-full lg:w-1/2 text-center lg:text-left"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
            Find Your <br className="hidden sm:block" /> Perfect Match
          </h2>

          <p className="text-base sm:text-lg text-white/90 mb-8">
            Connect, chat, and meet people who truly match your vibe.
          </p>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <motion.button
              onClick={() => (user ? navigate("/feed") : navigate("/login"))}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-full bg-pink-500 hover:bg-pink-600 font-semibold"
            >
              Get Started
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="w-full lg:w-1/2 flex justify-center gap-4 sm:gap-6"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4, duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="w-40 sm:w-48 lg:w-52 h-72 sm:h-80 lg:h-96 bg-white rounded-3xl shadow-xl overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
              alt="profile"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="w-40 sm:w-48 lg:w-52 h-72 sm:h-80 lg:h-96 bg-white rounded-3xl shadow-xl p-4 text-gray-700 flex flex-col justify-center"
          >
            <div className="space-y-3 text-sm">
              <div className="bg-pink-100 p-2 rounded-lg">
                Hey! How’s your day going? 💕
              </div>
              <div className="bg-purple-100 p-2 rounded-lg self-end">
                Pretty good! What about you?
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="bg-white text-gray-800 rounded-t-3xl px-4 sm:px-8 lg:px-16 py-14">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
        >
          {[
            {
              icon: "❤️",
              title: "Swipe & Match",
              desc: "Discover people who match your interests.",
            },
            {
              icon: "💬",
              title: "Chat Instantly",
              desc: "Start conversations without barriers.",
            },
            {
              icon: "📍",
              title: "Meet Nearby",
              desc: "Connect with people near your location.",
            },
          ].map((item, index) => (
            <motion.div key={index} variants={fadeUp}>
              <div className="text-3xl">{item.icon}</div>
              <h3 className="text-lg font-bold mt-3">{item.title}</h3>
              <p className="text-gray-600 mt-2 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="bg-gray-50 px-4 sm:px-8 lg:px-16 py-16 text-gray-800">
        <motion.h2
          className="text-2xl sm:text-3xl font-extrabold text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          How It Works
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "Create Profile",
              desc: "Set up your profile in minutes.",
            },
            {
              step: "2",
              title: "Swipe & Match",
              desc: "Match with people you like.",
            },
            {
              step: "3",
              title: "Meet in Person",
              desc: "Take it offline and meet safely.",
            },
          ].map((item, index) => (
            <motion.div
              key={item.step}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-white p-6 rounded-2xl shadow text-center"
            >
              <span className="text-pink-500 text-2xl font-bold">
                {item.step}
              </span>
              <h4 className="text-lg font-semibold mt-3">{item.title}</h4>
              <p className="text-gray-600 text-sm mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
