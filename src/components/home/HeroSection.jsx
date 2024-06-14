import { Link } from "react-router-dom";
import heroImg from '../../assets/images/hero-img.png';
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="py-8 md:py-4 mx-20 relative overflow-hidden">
      <div className="container">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8 [&>*]:flex-1"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div>
            <motion.h1
              className="text-5xl font-semibold leading-[1.2] mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
            >
              Welcome to <span className="text-primary">Student </span>Project Mangement
            </motion.h1>
            <motion.p
              className="max-w-[550px] text-gray-600"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
            >
              Student Project Management is an online project based web platform, where people can took part in group study with his friends. They can create, submit, review assignments of each other in this platform.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeInOut" }}
          >
            <motion.img
              className="w-full max-w-[450px] block mx-auto"
              src={heroImg}
              alt="Hero Section Image"
              animate={{ x: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Unique design elements */}
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-gradient-to-r from-white to-teal-300 blur-3xl opacity-20" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-l from-purple-500 to-sky-300 blur-3xl opacity-20" />
    </section>
  );
};

export default HeroSection;