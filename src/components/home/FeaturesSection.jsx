import {  FaClipboardCheck, FaUserGraduate, FaCalendarCheck, FaChalkboard, FaHandshakeAngle, FaShield } from 'react-icons/fa6';

const FeaturesSection = () => {
  return (
    <section className="mt-16 ml-16">
      <div className="container">
        <h2 className="text-4xl font-semibold mb-8 text-center mt-10 text-gray-800">
          Benefits of Using <span className="text-indigo-600">Student Project Management</span>
        </h2>
        <p className="max-w-[700px] mx-auto text-center mb-12 text-gray-600">
          Discover the advantages of our comprehensive platform designed to streamline project management for students and instructors alike.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-indigo-600 p-8 rounded-lg shadow-md text-white">
            <FaHandshakeAngle className="text-6xl mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Collaborative Environment</h3>
            <p className="mb-4">Foster teamwork and collaboration among students by providing a dedicated space for project management.</p>
          </div>
          <div className="bg-green-600 p-8 rounded-lg shadow-md text-white">
            <FaClipboardCheck className="text-5xl mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Organized Project Tracking</h3>
            <p className="mb-4">Keep track of project assignments, submissions, and reviews in a centralized and organized manner.</p>
          </div>
          <div className="bg-yellow-500 p-8 rounded-lg shadow-md text-white">
            <FaUserGraduate className="text-5xl mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Student Empowerment</h3>
            <p className="mb-4">Empower students with a personalized portal to manage their projects, submit work, and track progress.</p>
          </div>
          <div className="bg-purple-600 p-8 rounded-lg shadow-md text-white">
            <FaChalkboard className="text-5xl mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Instructor Dashboard</h3>
            <p className="mb-4">Provide instructors with a comprehensive dashboard for overseeing assignments, submissions, and reviews.</p>
          </div>
          <div className="bg-teal-600 p-8 rounded-lg shadow-md text-white">
            <FaCalendarCheck className="text-5xl mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Efficient Time Management</h3>
            <p className="mb-4">Streamline project management processes, ensuring timely delivery and efficient use of time.</p>
          </div>
          <div className="bg-orange-600 p-8 rounded-lg shadow-md text-white">
            <FaShield className="text-5xl mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Secure and Transparent</h3>
            <p className="mb-4">Enjoy a secure platform with transparency and accountability for all project-related activities.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;