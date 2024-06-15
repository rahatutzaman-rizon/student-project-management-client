
import { motion } from 'framer-motion';
import { FaUserGraduate, FaChalkboardTeacher, FaTasks, FaFile, FaChartBar, FaEnvelope } from 'react-icons/fa';

const FeatureProject = () => {
  const featureVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const features = [
    {
      icon: <FaUserGraduate />,
      title: 'Student Groups',
      description: 'Teachers can create and manage groups of students.',
    },
    {
      icon: <FaChalkboardTeacher />,
      title: 'Teacher Assignment',
      description: 'Teachers can assign tasks to specific student groups.',
    },
    {
      icon: <FaTasks />,
      title: 'Task Management',
      description: 'Students receive tasks via email and can submit their work.',
    },
    {
      icon: <FaFile />,
      title: 'Excel Integration',
      description: 'Teachers can easily handle student groups using Excel files.',
    },
    {
      icon: <FaChartBar />,
      title: 'Performance Evaluation',
      description: 'Teachers can evaluate student performance with interactive charts.',
    },
    {
      icon: <FaEnvelope />,
      title: 'Email Notifications',
      description: 'Students receive email notifications for new tasks and updates.',
    },
  ];

  return (
    <section className="bg-gradient-to-r from-teal-400 to-sky-400 py-12 px-8 rounded-lg shadow-xl">
      <h2 className="text-4xl font-bold text-black mb-8 text-center">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={featureVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-lg p-6 shadow-md flex flex-col items-center"
          >
            <div className="bg-teal-500 text-white rounded-full p-4 mb-4">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2 text-teal-700">{feature.title}</h3>
            <p className="text-center text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeatureProject;