import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchTeachers } from '../api/teacherapi';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// Simple secret key - in production, use environment variable
const SECRET_KEY = "faculty-portal-2024-secure-key";

const Project = () => {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const loadTeachers = async () => {
      try {
        const data = await fetchTeachers();
        setTeachers(data);
      } catch (error) {
        console.error("Failed to fetch teachers:", error);
        showNotification("Failed to load teachers", "error");
      } finally {
        setLoading(false);
      }
    };

    loadTeachers();
  }, []);

  // Simple token generation
  const generateToken = (teacherId) => {
    const timestamp = new Date().getTime();
    return `${teacherId}-${timestamp}-${SECRET_KEY}`;
  };

  const showNotification = (message, type = 'success') => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleProfileClick = (teacher) => {
    setSelectedTeacher(teacher);
    setShowModal(true);
    setError('');
    setEmail(`user${teacher.id}@example.com`);
    setPassword(`pass${teacher.id}`);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const validEmail = `user${selectedTeacher.id}@example.com`;
    const validPassword = `pass${selectedTeacher.id}`;

    if (email === validEmail && password === validPassword) {
      // Generate simple token and store in cookie
      const token = generateToken(selectedTeacher.id);
      
      // Set cookie with token - expires in 24 hours
      Cookies.set('authToken', token, { 
        expires: 1,
        secure: true,
        sameSite: 'strict'
      });

      setShowModal(false);
      showNotification(`Welcome back, ${selectedTeacher.name}!`);
      
      setTimeout(() => {
        navigate(`/project/${selectedTeacher.id}`);
      }, 1500);
    } else {
      setError(`Please use these demo credentials:\nEmail: ${validEmail}\nPassword: ${validPassword}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3069a1] to-[#0074D9] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Our Faculty Members
          </h1>
          <p className="text-xl text-blue-100">
            Meet our exceptional teaching staff
          </p>
        </motion.div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
          </div>
        ) : (
          /* Teachers Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachers.map((teacher) => (
              <motion.div
                key={teacher.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg"
              >
                <img 
                  src={teacher.image} 
                  alt={teacher.name} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {teacher.name}
                  </h3>
                  <p className="text-blue-600 mb-2">{teacher.designation}</p>
                  <p className="text-gray-600 mb-4">{teacher.department}</p>
                  <button
                    onClick={() => handleProfileClick(teacher)}
                    className="w-full bg-gradient-to-br from-[#001f3f] to-[#0074D9] text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    View Profile
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Login Modal */}
        <AnimatePresence>
          {showModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-lg p-6 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-2xl font-bold mb-4">Login Required</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                  {error && (
                    <div className="bg-blue-50 text-blue-800 p-3 rounded-md text-sm">
                      {error}
                    </div>
                  )}
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 text-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Toast Notification */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-4 right-4 z-50"
            >
              <div className="bg-white px-4 py-3 rounded-lg shadow-lg">
                <p className="text-gray-800">{toastMessage}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Project;