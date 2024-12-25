import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { GlobalContext } from "../context/ContextProvider";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import toast from "react-hot-toast";
import { axiosInstance } from "../hooks/useAxios";

// Importing icons from react-icons
import { FiMenu, FiX, FiChevronDown, FiLogOut, FiUser } from "react-icons/fi";

const Header = () => {
  const { user } = useContext(GlobalContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  }, [location]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        axiosInstance('/logout', { headers: { Authorization: user?.email } })
          .then(res => console.log(res.data));
        toast.success('Logout Successful!');
      })
      .catch(error => {
        toast.error(error.code);
      });
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/project', label: 'Teacher' },
    { path: '/group', label: 'Student' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/assign', label: 'Assign' },
  ];

  const renderNavLinks = (mobile = false) => (
    <ul className={`flex ${mobile ? 'flex-col' : 'flex-row'} items-center gap-1 md:gap-2`}>
      {navLinks.map(({ path, label }) => (
        <li key={path}>
          <NavLink
            to={path}
            className={({ isActive }) =>
              `text-sm md:text-base font-medium transition-all duration-200 px-3 py-2 rounded-md ${
                isActive 
                  ? "text-white bg-teal-500 hover:bg-teal-600" 
                  : "text-gray-700 hover:text-teal-500 hover:bg-gray-100"
              }`
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  );

  const renderUserProfile = () => (
    <div className="relative ml-4">
      <button
        className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
      >
        {user?.photoURL ? (
          <img
            className="w-8 h-8 rounded-full object-cover border-2 border-teal-500"
            src={user.photoURL}
            alt="User"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-medium">
            {user?.displayName?.[0] || <FiUser />}
          </div>
        )}
        <FiChevronDown
          className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
            profileDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      
      {profileDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 transition-all duration-200 ease-in-out transform origin-top-right">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              {user?.photoURL ? (
                <img
                  className="w-12 h-12 rounded-full object-cover border-2 border-teal-500"
                  src={user.photoURL}
                  alt="User"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center text-white font-medium text-xl">
                  {user?.displayName?.[0] || <FiUser />}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.displayName || "User"}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              handleLogout();
              setProfileDropdownOpen(false);
            }}
            className="w-full px-4 py-2 flex items-center gap-2 text-red-600 hover:bg-red-50 transition-colors duration-200"
          >
            <FiLogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-md mb-[-12px]">
      <div className="container mx-auto px-4">
        <nav className="flex h-16 items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="text-xl font-bold text-gray-900">
              <span className="text-teal-500">Student</span> Project Management
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center">
            {renderNavLinks()}
            <div className="flex items-center ml-4">
              {!user ? (
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-md bg-teal-500 px-4 py-2 text-sm font-medium text-white hover:bg-teal-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                  Sign In
                </Link>
              ) : (
                renderUserProfile()
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <FiX className="h-6 w-6" aria-hidden="true" />
            ) : (
              <FiMenu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <nav className="px-2 pb-4 pt-2">
            {renderNavLinks(true)}
            <div className="mt-4">
              {!user ? (
                <Link
                  to="/login"
                  className="block w-full text-center rounded-md bg-teal-500 px-4 py-2 text-sm font-medium text-white hover:bg-teal-600 transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-md bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition-colors duration-200"
                >
                  <FiLogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

