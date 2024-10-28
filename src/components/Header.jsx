import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { GlobalContext } from "../context/ContextProvider";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import toast from "react-hot-toast";
import { axiosInstance } from "../hooks/useAxios";

import { Menu, X, ChevronDown, LogOut } from "lucide-react";

const Header = () => {
  const { user } = useContext(GlobalContext);
  const [drawerShow, setDrawerShow] = useState(false);
  const [profileShow, setProfileShow] = useState(false);


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
    { path: '/update', label: 'Excel' },
  ];

  const renderNavLinks = () => (
    <ul className="flex flex-col lg:flex-row items-center gap-8">
      {navLinks.map(({ path, label }) => (
        <li key={path}>
          <NavLink
            to={path}
            className={({ isActive }) =>
              `text-base font-medium transition-colors hover:text-teal-500 ${
                isActive ? "text-teal-500" : "text-gray-700"
              }`
            }
            onClick={() => setDrawerShow(false)}
          >
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  );

  const renderUserProfile = () => (
    <div className="relative ml-8">
      <div
        className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors"
        onClick={() => setProfileShow(!profileShow)}
      >
        {user?.photoURL ? (
          <img
            className="w-8 h-8 rounded-full object-cover border-2 border-teal-500"
            src={user.photoURL}
            alt="User"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-medium">
            {user?.displayName?.[0] || "U"}
          </div>
        )}
        <ChevronDown
          className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
            profileShow ? "rotate-180" : ""
          }`}
        />
      </div>
      
      {profileShow && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
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
                  {user?.displayName?.[0] || "U"}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.displayName || "User"}
                </p>
                <p className="text-sm text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 flex items-center gap-2 text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-sm border-b border-gray-200 ">
      <div className="container mx-auto px-4">
        <nav className="flex h-16 items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => setDrawerShow(false)}
          >
            <span className="text-xl font-bold text-gray-900">
              <span className="text-teal-500">Student</span> Project Management
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center">
            {renderNavLinks()}
            <div className="flex items-center">
              {!user ? (
                <Link
                  to="/login"
                  className="ml-8 inline-flex items-center justify-center rounded-lg bg-teal-500 px-4 py-2 text-sm font-medium text-white hover:bg-teal-600 transition-colors"
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
            onClick={() => setDrawerShow(!drawerShow)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {drawerShow ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {drawerShow && (
          <div className="fixed inset-0 top-16 bg-white z-30 lg:hidden">
            <nav className="h-full p-4">
              <div className="flex flex-col h-full">
                <div className="space-y-4">
                  {renderNavLinks()}
                  {!user ? (
                    <Link
                      to="/login"
                      className="block w-full text-center rounded-lg bg-teal-500 px-4 py-2 text-sm font-medium text-white hover:bg-teal-600 transition-colors"
                      onClick={() => setDrawerShow(false)}
                    >
                      Sign In
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        handleLogout();
                        setDrawerShow(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  )}
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
     
    </header>
  );
};

export default Header;