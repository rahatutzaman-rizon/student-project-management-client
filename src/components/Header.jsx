import { useContext, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { GlobalContext } from "../context/ContextProvider";
import {FaCircleXmark, FaBars} from 'react-icons/fa6';
import HeroSection from "./home/HeroSection";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import toast from "react-hot-toast";
import { axiosInstance } from "../hooks/useAxios";

const Header = () => {
  const {user, userLoaded} = useContext(GlobalContext);
  const [drawerShow, setDrawerShow] = useState(false);
  const [profileShow, setProfileShow] = useState(false);
  const {pathname} = useLocation();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        axiosInstance('/logout', {headers: {Authorization: user?.email}})
          .then(res => console.log(res.data));
        toast.success('Logout Successful !!!');
      })
      .catch(error => {
        toast.error(error.code);
      })
  }

  return (
    <header className={`py-4 ${pathname === '/' ? 'bg-gray-200' : 'bg-white'}`}>
      <div className="container">
        <nav className="flex justify-between items-center gap-6 relative">
          <Link to='/' className="flex justify-center items-center gap-2" onClick={() => scrollTo(0, 0)}>
            {/* <img className="max-w-[30px]" src="/favicon.png" alt="Brand Icon" /> */}
            <span className="text-3xl font-bold ml-12"><span className="text-primary">Student </span>Project Management</span>
          </Link>

          {
            userLoaded && user && <>
           <Link to="/group" className="btn btn-success">Groups</Link>

            </>
          }

          <ul className="flex flex-col xl:flex-row justify-center items-center gap-6 fixed xl:static top-0 bottom-0 bg-white xl:bg-[transparent] w-4/5 max-w-[320px] xl:w-auto xl:max-w-none [box-shadow:-10px_0px_50px_rgba(0,0,0,0.3)] xl:[box-shadow:none] transition-[right] duration-300 z-30 text-xl xl:text-base" style={drawerShow ? {right: "0px"} : {right: "-400px"}}>
            <FaCircleXmark className="xl:hidden text-3xl text-primary absolute left-6 top-6 cursor-pointer" onClick={() => setDrawerShow(false)} />
            <li>
              <NavLink to='/' className={({isActive}) => isActive ? "font-bold text-primary" : ""} onClick={() => {setDrawerShow(false); scrollTo(0, 0)}}>Home</NavLink>
            </li>
            {/* <li>
              <NavLink to='/assignments' className={({isActive}) => isActive ? "font-bold text-primary" : ""} onClick={() => {setDrawerShow(false); scrollTo(0, 0)}}>Assignments</NavLink>
            </li> */}
            {
              userLoaded && user && <>
                <li>
                  <NavLink to='/project' className={({isActive}) => isActive ? "font-bold text-primary" : ""} onClick={() => {setDrawerShow(false); scrollTo(0, 0)}}>Project Progress</NavLink>
                </li>
                {/* <li>
                  <NavLink to='/submitted-assignments' className={({isActive}) => isActive ? "font-bold text-primary" : ""} onClick={() => {setDrawerShow(false); scrollTo(0, 0)}}>Submitted Assignments</NavLink>
                </li>
                <li>
                  <NavLink to='/create-assignment' className={({isActive}) => isActive ? "font-bold text-primary" : ""} onClick={() => {setDrawerShow(false); scrollTo(0, 0)}}>Create Assignment</NavLink>
                </li> */}
              </>
            }
          </ul>

          <div className="flex justify-center items-center gap-4">
            {
              userLoaded ? user ? <div className="flex justify-center items-center gap-2">
                <div className="relative group peer cursor-pointer">
                  <img className="w-10 h-10 rounded-full select-none" onClick={() => setProfileShow(!profileShow)} src={user?.photoURL} alt="User's Photo" />
                  <span className="w-8 h-8 bg-white rotate-45 absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-10" style={profileShow ? {display: "block"} : {display: "none"}}></span>
                </div>
                <div className="flex-col justify-center items-center bg-white p-6 rounded-lg absolute top-[calc(100%+1rem)] right-0 w-full max-w-[320px] [box-shadow:0px_10px_40px_5px_rgba(0,0,0,0.3)]" style={profileShow ? {display: "flex"} : {display: "none"}}>
                  <img className="w-20 h-20 rounded-full mb-4 z-20" src={user?.photoURL} alt="User's Photo" />
                  <span className="text-[18px] font-medium mb-1">{user?.displayName}</span>
                  <span className="mb-4">{user?.email}</span>
                  <button className="btn btn-warning" onClick={() => {handleLogout(), setProfileShow(false)}}>Logout</button>
                </div>
                <button className="btn btn-warning hidden sm:inline-flex" onClick={() => {handleLogout(), setProfileShow(false)}}>Logout</button>
              </div> : <div className="flex justify-center items-center gap-2">
                <Link to='/login' className="btn btn-primary" onClick={() => scrollTo(0, 0)}>Login</Link>
                <Link to='/register' className="btn btn-primary btn-outline hidden sm:inline-flex" onClick={() => scrollTo(0, 0)}>Register</Link>
              </div> : <div className="flex justify-center items-center">
                <span className="loading loading-spinner loading-md text-primary"></span>
              </div>
            }
            <FaBars className="text-2xl xl:hidden cursor-pointer" onClick={() => setDrawerShow(true)} />
          </div>
        </nav>
      </div>
      {
        pathname === '/' && <HeroSection />
      }
    </header>
  );
};

export default Header;