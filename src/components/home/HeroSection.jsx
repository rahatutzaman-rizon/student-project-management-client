import heroImg from '../../assets/images/hero-img.png';
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden rounded-lg my-4 py-16 px-4 md:py-20 md:px-8 bg-gradient-to-br from-[#001f3f] to-[#0074D9]">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold leading-tight text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Welcome to <span className="text-[#FFC300]">Student </span>Project Management
          </motion.h1>
          <motion.p
            className="max-w-lg mx-auto md:mx-0 text-gray-200 text-lg mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Student Project Management is an online platform where students collaborate, submit, and review assignments in a group study environment.
          </motion.p>
          <motion.a
            href="/group"
            className="inline-block bg-[#FFC300] text-[#001f3f] font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-[#FFD700] transition-transform duration-300 transform hover:scale-105"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Get Started
          </motion.a>
        </motion.div>

        <div className="flex-1 max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeInOut" }}
          >
            <motion.img
              className="w-full h-auto rounded-lg shadow-lg"
              src={heroImg}
              alt="Hero Section Image"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </div>

      {/* Decorative Floating Circles */}
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
