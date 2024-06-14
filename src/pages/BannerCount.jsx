import React from 'react';
import { motion } from 'framer-motion';

const Banner = () => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.2,
        duration: 0.8,
        staggerChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50, rotate: -10 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: {
        duration: 0.6,
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const stats = [
    { label: 'Hardware Projects', value: 8 },
    { label: 'Software Projects', value: 13 },
    { label: 'Thesis', value: 9 },
    { label: 'Number of Teachers', value: 7 },
    { label: 'Number of Students', value: 53 },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-gradient-to-r from-teal-300 to-sky-300 py-12 px-8 rounded-lg shadow-xl"
    >
      <motion.div
        className="flex flex-col items-center mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <motion.img
          src="https://i.ibb.co/8g7jXcv/mbstu.jpg"
          alt="MBSTU Logo"
          className="h-24 rounded-lg mb-4"
          initial={{ scale: 0.8, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
        />
        <motion.h2
          className="text-4xl font-bold text-white text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          ICT Department
        </motion.h2>
      </motion.div>
      <motion.h3
        className="text-2xl text-white mb-10 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        Session 2018-19
      </motion.h3>
      <motion.p
        className="text-lg text-white mb-8 text-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        Explore the remarkable achievements of our talented students and dedicated faculty.
      </motion.p>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-white rounded-lg p-6 shadow-md"
          >
            <motion.h3
              className="text-lg font-semibold mb-2 text-pink-700"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 + 1.4 }}
            >
              {stat.label}
            </motion.h3>
            <motion.p
              className="text-5xl font-bold text-pink-600"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 + 1.5 }}
            >
              {stat.value}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Banner;