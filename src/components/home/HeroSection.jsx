import heroImg from '../../assets/images/hero-img.png';
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="py-8 md:py-16 bg-gradient-to-r from-sky-500 to-teal-300 relative overflow-hidden rounded-lg my-4">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="flex-1 text-center md:text-left">
            <motion.h1
              className="text-4xl md:text-6xl font-bold leading-tight mb-4 text-white"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
            >
              Welcome to <span className="text-yellow-300">Student </span>Project Management
            </motion.h1>
            <motion.p
              className="max-w-lg mx-auto md:mx-0 text-gray-200 text-lg mb-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
            >
              Student Project Management is an online project based web platform, where people can take part in group study with their friends. They can create, submit, review assignments of each other on this platform.
            </motion.p>
            <motion.a
              href="/"
              className="inline-block bg-white text-purple-600 font-semibold px-6 py-3 rounded-md shadow-md hover:bg-gray-200 transition-colors duration-300"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeInOut" }}
            >
              Get Started
            </motion.a>
          </div>

          <div className="flex-1 max-w-lg mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8, ease: "easeInOut" }}
            >
              <motion.img
                className="w-full block mx-auto"
                src={heroImg}
                alt="Hero Section Image"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Unique design elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-white blur-3xl opacity-20" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-white blur-3xl opacity-20" />
      </div>
    </section>
  );
};

export default HeroSection;