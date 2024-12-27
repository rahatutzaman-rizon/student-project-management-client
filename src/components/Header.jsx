import { useContext, useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { GlobalContext } from "../context/ContextProvider";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import toast from "react-hot-toast";
import { axiosInstance } from "../hooks/useAxios";
import {
  Home,
  GraduationCap,
  Users,
  LayoutDashboard,
  ClipboardList,
  LogOut,
  ChevronDown,
  Menu,
  X,
  User
} from "lucide-react";

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
    { path: '/', label: 'Home', icon: Home },
    { path: '/project', label: 'Teacher', icon: GraduationCap },
    { path: '/group', label: 'Student', icon: Users },
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/assign', label: 'Assign', icon: ClipboardList },
  ];

  const renderNavLinks = (mobile = false) => (
    <ul className={`flex ${mobile ? 'flex-col space-y-2' : 'flex-row'} items-center gap-3`}>
      {navLinks.map(({ path, label, icon: Icon }) => (
        <li key={path}>
          <NavLink
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-2 text-sm font-medium transition-all duration-300 px-4 py-2.5 rounded-lg ${
                isActive 
                  ? "text-white bg-gradient-to-r from-indigo-600 to-blue-500 shadow-md hover:shadow-lg transform hover:-translate-y-0.5" 
                  : "text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
              }`
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );

  const renderUserProfile = () => (
    <div className="relative ml-6">
      <button
        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
      >
        {user?.photoURL ? (
          <img
            className="w-10 h-10 rounded-lg object-cover ring-2 ring-indigo-500/30"
            src={user.photoURL}
            alt="User"
          />
        ) : (
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white shadow-md">
            {user?.displayName?.[0] || <User className="w-5 h-5" />}
          </div>
        )}
        <ChevronDown
          className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
            profileDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      
      {profileDropdownOpen && (
        <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-xl border border-gray-100 py-3 z-50 transition-all duration-300 ease-in-out transform origin-top-right">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-4">
              {user?.photoURL ? (
                <img
                  className="w-14 h-14 rounded-lg object-cover ring-2 ring-indigo-500/30"
                  src={user.photoURL}
                  alt="User"
                />
              ) : (
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white shadow-md text-xl">
                  {user?.displayName?.[0] || <User className="w-6 h-6" />}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-base font-semibold text-gray-900 tracking-tight">
                  {user?.displayName || "User"}
                </p>
                <p className="text-sm text-gray-500 truncate mt-0.5">{user?.email}</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              handleLogout();
              setProfileDropdownOpen(false);
            }}
            className="w-full px-4 py-3 flex items-center gap-3 text-red-600 hover:bg-red-50 transition-all duration-300"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <header className="sticky top-0  w-full bg-white border-b border-gray-100 backdrop-blur-sm  z-50">
      <div className="container mx-auto px-4">
        <nav className="flex h-20 items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="text-2xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">Student</span>
              <span className="text-gray-900"> Project Management</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center">
            {renderNavLinks()}
            <div className="flex items-center">
              {!user ? (
                <Link
                  to="/login"
                  className="ml-6 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
            className="md:hidden p-2.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <nav className="px-2 pb-6 pt-4">
            {renderNavLinks(true)}
            <div className="mt-6">
              {!user ? (
                <Link
                  to="/login"
                  className="block w-full text-center rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 px-5 py-3 text-sm font-medium text-white hover:shadow-lg transition-all duration-300"
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
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-red-50 px-5 py-3 text-sm font-medium text-red-600 hover:bg-red-100 transition-all duration-300"
                >
                  <LogOut className="w-5 h-5" />
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