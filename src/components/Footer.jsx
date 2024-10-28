
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-900 text-gray-200 mt-16">
      {/* Gradient Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900 pointer-events-none" />

      {/* Main Footer Content */}
      <div className="relative container mx-auto px-6 pt-16 pb-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">Student</span>
                <span className="text-white">Project</span>
              </h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Lets study together with friends and get higher facilities in group study with this platform.
              Join our community of learners today.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-5">
              <a 
                href="https://www.facebook.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transform hover:scale-110 transition-transform duration-200"
              >
                <svg className="w-6 h-6 text-sky-400 hover:text-sky-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transform hover:scale-110 transition-transform duration-200"
              >
                <svg className="w-6 h-6 text-sky-400 hover:text-sky-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm3 15.5a3.5 3.5 0 0 1-3.5 3.5h-3A3.5 3.5 0 0 1 5 17.5v-11A3.5 3.5 0 0 1 8.5 3h3A3.5 3.5 0 0 1 15 6.5z"/>
                </svg>
              </a>
              <a 
                href="https://www.twitter.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transform hover:scale-110 transition-transform duration-200"
              >
                <svg className="w-6 h-6 text-sky-400 hover:text-sky-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/" 
                  onClick={() => window.scrollTo(0, 0)}
                  className="text-gray-400 hover:text-sky-400 transition-colors duration-200 text-sm flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/assignment" 
                  onClick={() => window.scrollTo(0, 0)}
                  className="text-gray-400 hover:text-sky-400 transition-colors duration-200 text-sm flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                  Assignment
                </Link>
              </li>
              <li>
                <Link 
                  to="/login" 
                  onClick={() => window.scrollTo(0, 0)}
                  className="text-gray-400 hover:text-sky-400 transition-colors duration-200 text-sm flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Resources</h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-sky-400 transition-colors duration-200 text-sm flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                  Documentation
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-sky-400 transition-colors duration-200 text-sm flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                  Support
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-sky-400 transition-colors duration-200 text-sm flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter for updates and news.</p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-sky-400 text-gray-300 text-sm"
              />
              <button className="w-full px-4 py-2 bg-sky-500 text-white rounded-lg text-sm font-medium hover:bg-sky-400 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © {currentYear} Student Project Management. All rights reserved.
            </div>
            
            {/* Developer Credit */}
            <div className="text-gray-400 text-sm">
              Developed with 
              <svg className="w-4 h-4 text-red-500 inline mx-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              by <a href="#" className="text-sky-400 hover:text-sky-300 font-medium">Rahatutzaman Rizon</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;