import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const Banner = () => {
  const stats = [
    { label: 'Hardware Projects', value: 8 },
    { label: 'Software Projects', value: 13 },
    { label: 'Thesis', value: 9 },
    { label: 'Number of Teachers', value: 7 },
    { label: 'Number of Students', value: 53 },
  ];

  return (
    <div className="bg-[#001f3f] py-12 px-8 rounded-lg shadow-xl mt-[-60px]">
      <div className="flex flex-col items-center mb-8 mt-4">
        <img
          src="https://i.ibb.co/8g7jXcv/mbstu.jpg"
          alt="MBSTU Logo"
          className="h-24 rounded-lg mb-4"
        />
        <h2 className="text-4xl font-bold text-white text-center">ICT Department</h2>
      </div>
      <h3 className="text-2xl text-white mb-10 text-center">Session 2018-19</h3>
      <p className="text-lg text-white mb-8 text-center">
        Explore the remarkable achievements of our talented students and dedicated faculty.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className=" bg-[#0074D9] rounded-lg p-6 shadow-md transform transition duration-300 hover:scale-105"
          >
            <h3 className="text-lg font-semibold mb-2 text-white">{stat.label}</h3>
            <p className="text-5xl font-bold text-white">
              <CountUp end={stat.value} duration={2.5} />
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
