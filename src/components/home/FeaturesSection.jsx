import React from 'react';
import { motion } from 'framer-motion';

const FeaturesSection = () => {
  const features = [
    {
      title: "Collaborative Environment",
      description: "Foster teamwork through integrated project management and real-time communication tools.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 1 12 12.75a5.995 5.995 0 0 1-5.058-2.928m0 0a5.969 5.969 0 0 1-.941 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
        </svg>
      ),
      gradient: "from-blue-600 to-blue-800"
    },
    {
      title: "Smart Project Tracking",
      description: "Streamline project management with real-time updates and intuitive progress tracking.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
        </svg>
      ),
      gradient: "from-green-600 to-green-800"
    },
    {
      title: "Advanced Analytics",
      description: "Gain insights with comprehensive performance metrics and visualization tools.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.5-1.5 1-3m-7.5-3h7.5M6 10.5l2-1.5m0 0 3-2.25m-3 2.25v4.5m5.25-4.5 3 2.25m0 0 3 1.5m-3-1.5v4.5" />
        </svg>
      ),
      gradient: "from-purple-600 to-purple-800"
    },
    {
      title: "Secure Communication",
      description: "Enterprise-grade security with encrypted messaging and file sharing.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
      ),
      gradient: "from-red-600 to-red-800"
    },
    {
      title: "Time Management",
      description: "Automated deadline tracking and personalized productivity insights.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ),
      gradient: "from-orange-600 to-orange-800"
    },
    {
      title: "Feedback Engine",
      description: "Comprehensive feedback system with automated and peer review mechanisms.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.17 48.17 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
        </svg>
      ),
      gradient: "from-teal-600 to-teal-800"
    }
  ];

  return (
    <section className="bg-gray-900  py-12 mb-[-64px]">
      <div className=" mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-2"
        >
          <h2 className="text-5xl font-bold mb-4 text-white">
            Elevate Your Project Management
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
            Discover a comprehensive platform designed to streamline collaboration, tracking, and success.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.1 
              }}
              className="group"
            >
              <div className={`
                bg-gradient-to-br ${feature.gradient}
                rounded-lg p-6 
                transform transition-all duration-300 
                hover:scale-105 hover:shadow-2xl
                text-white
                border border-opacity-20 border-white
              `}>
                <div className={`
                  w-16 h-16 mb-4 
                  bg-white bg-opacity-10 
                  rounded-full flex items-center justify-center
                  group-hover:rotate-6
                  transition-transform
                `}>
                  {React.cloneElement(feature.icon, {
                    className: "w-10 h-10 text-white"
                  })}
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-200 opacity-80">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection