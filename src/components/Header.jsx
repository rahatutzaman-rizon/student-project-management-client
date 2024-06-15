import { useContext, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { GlobalContext } from "../context/ContextProvider";
import { FaBars, FaChevronDown } from 'react-icons/fa';
import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import toast from "react-hot-toast";
import { axiosInstance } from "../hooks/useAxios";
import HeroSection from "./home/HeroSection";

const Header = () => {
  const { user, userLoaded } = useContext(GlobalContext);
  const [drawerShow, setDrawerShow] = useState(false);
  const [profileShow, setProfileShow] = useState(false);
  const { pathname } = useLocation();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        axiosInstance('/logout', { headers: { Authorization: user?.email } })
          .then(res => console.log(res.data));
        toast.success('Logout Successful !!!');
      })
      .catch(error => {
        toast.error(error.code);
      });
  };

  const renderNavLinks = () => (
    <ul className="flex flex-col lg:flex-row lg:items-center lg:gap-6">
      <li>
        <NavLink to='/' className={({ isActive }) => isActive ? "font-bold text-teal-400" : "text-gray-800"} onClick={() => setDrawerShow(false)}>Home</NavLink>
      </li>
      {userLoaded && user && (
        <>
          <li>
            <NavLink to='/project' className={({ isActive }) => isActive ? "font-bold text-teal-400" : "text-gray-800"} onClick={() => setDrawerShow(false)}>Teacher</NavLink>
          </li>
          <li>
            <NavLink to='/group' className={({ isActive }) => isActive ? "font-bold text-teal-400" : "text-gray-800"} onClick={() => setDrawerShow(false)}>Student</NavLink>
          </li>
          <li>
            <NavLink to='/update' className={({ isActive }) => isActive ? "font-bold text-teal-400" : "text-gray-800"} onClick={() => setDrawerShow(false)}>Excel</NavLink>
          </li>
        </>
      )}
    </ul>
  );

  const renderUserProfile = () => (
    <div className="relative">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setProfileShow(!profileShow)}>
        <img className="w-10 h-10 rounded-full" src={user?.photoURL} alt="User" />
        <FaChevronDown className={`transition-transform ${profileShow ? 'rotate-180' : ''}`} />
      </div>
      <div className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ${profileShow ? 'block' : 'hidden'}`}>
        <div className="px-4 py-3">
          <img className="w-16 h-16 rounded-full mb-2" src={user?.photoURL} alt="User" />
          <p className="text-gray-800 font-medium">{user?.displayName}</p>
          <p className="text-gray-600">{user?.email}</p>
        </div>
        <div className="border-t border-gray-200">
          <button className="w-full px-4 py-2 text-left text-teal-400 hover:bg-gray-100" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );

  return (
    <header className="py-4 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center">
          <Link to='/' className="flex items-center gap-2" onClick={() => setDrawerShow(false)}>
            <span className="text-2xl font-bold text-gray-800"><span className="text-teal-400">Student</span> Project Management</span>
          </Link>
          <div className="lg:hidden">
            <button onClick={() => setDrawerShow(!drawerShow)} className="text-gray-800 text-2xl">
              <FaBars />
            </button>
          </div>
          <div className={`fixed inset-0 lg:static lg:flex lg:items-center bg-white lg:bg-transparent transform ${drawerShow ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:transform-none lg:transition-none z-30`}>
            <button className="lg:hidden absolute top-4 right-4 text-gray-800 text-2xl" onClick={() => setDrawerShow(false)}>
              <FaBars />
            </button>
            {renderNavLinks()}
            {userLoaded ? (
              user ? (
                <div className="ml-4">
                  {renderUserProfile()}
                </div>
              ) : (
                <span className="loading loading-spinner loading-md text-teal-400 ml-4"></span>
              )
            ) : null}
          </div>
        </nav>
        {pathname === '/' && <HeroSection />}
      </div>
    </header>
  );
};

export default Header;
