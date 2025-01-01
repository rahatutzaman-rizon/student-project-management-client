import  { useState } from "react";
import { FaYoutube, FaTimes, FaRocket, FaUsers, FaLaptopCode } from "react-icons/fa";
import { motion } from "framer-motion";
import heroImg from "../../assets/images/hero-img.png";
const HeroSection = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="relative overflow-hidden rounded-lg my-4 py-16 px-4 md:py-20 md:px-8 bg-gradient-to-br from-[#001f3f] to-[#0074D9]">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div 
            className="flex items-center justify-center md:justify-start gap-4 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <FaRocket className="text-4xl text-[#FFC300]" />
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white">
              Welcome to <span className="text-[#FFC300]">Student</span> Project
            </h1>
          </motion.div>

          <div className="flex flex-wrap gap-6 justify-center md:justify-start mb-8">
            <motion.div 
              className="flex items-center gap-2 bg-white/10 backdrop-blur-lg rounded-lg p-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <FaUsers className="text-2xl text-[#FFC300]" />
              <span className="text-white">Team Collaboration</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2 bg-white/10 backdrop-blur-lg rounded-lg p-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <FaLaptopCode className="text-2xl text-[#FFC300]" />
              <span className="text-white">Project Management</span>
            </motion.div>
          </div>

          <motion.p
            className="max-w-lg mx-auto md:mx-0 text-gray-200 text-lg mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Student Project Management is an online platform where students
            collaborate, submit, and review assignments in a group study
            environment.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <motion.a
              href="/group"
              className="inline-block bg-[#FFC300] text-[#001f3f] font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-[#FFD700] transition-all duration-300 hover:scale-105"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex items-center gap-2">
                <FaRocket />
                <span>Get Started</span>
              </div>
            </motion.a>
            <motion.button
              onClick={() => setShowModal(true)}
              className="flex items-center justify-center gap-2 bg-red-500 text-white px-8 py-3 rounded-full shadow-lg hover:bg-red-600 transition-all duration-300 hover:scale-105"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <FaYoutube className="text-xl" />
              <span>Watch Video</span>
            </motion.button>
          </div>
        </motion.div>

        <div className="flex-1 max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.img
              className="w-full h-auto rounded-lg shadow-lg"
              src={heroImg}
              alt="Hero Section"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </div>

      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="bg-white rounded-xl w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute -top-4 -right-4 text-gray-700 hover:text-gray-900 bg-white hover:bg-gray-100 rounded-full p-2 shadow-lg transition-all duration-300"
            >
              <FaTimes className="text-xl" />
            </button>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                Watch Our Tutorial
              </h2>
              <div className="relative w-full aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/thJSev60yfg?si=cj8BFEudYjNTBHFU"
                  title="Tutorial Video"
                  className="w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-16 -left-16 w-80 h-80 rounded-full bg-white opacity-20 blur-3xl"
          animate={{ x: [-10, 10, -10], y: [-10, 10, -10] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-white opacity-20 blur-3xl"
          animate={{ x: [10, -10, 10], y: [10, -10, 10] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </section>
  );
};

export default HeroSection;
