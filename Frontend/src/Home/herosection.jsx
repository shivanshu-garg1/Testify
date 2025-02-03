import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video Container */}
      <div className="absolute top-0 left-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        >
          <source src="/3163534-uhd_3840_2160_30fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Hero Content */}
      <div className="relative flex flex-col items-center justify-center h-full text-center text-white px-4">
        <motion.div
          initial={{ opacity: 5, y: -20 }}
          animate={{ opacity: 6, y: 0 }}
          transition={{ duration: 1.0 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl font-bold">
            Simplifying Exams, Empowering Minds
          </h1>
          <p className="text-lg mt-4">
            Effortless test management that empowers educators to create, conduct, and track exams while enhancing student learning
          </p>
          <button className="bg-teal-400 text-gray-800 px-4 py-2 rounded-lg hover:bg-teal-500 transition">
            Get Started
          </button>
        </motion.div>
      </div>
    </div>
  );
}
