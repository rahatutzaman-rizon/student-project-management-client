import { NavLink, Outlet } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import { MdDashboard } from "react-icons/md";

const Dashboard = () => {

    const { user } = useAuth();

    return (
        <div>
            <Helmet>
                <title>Dashboard </title>
            </Helmet>
            <div className="grid grid-cols-1 md:grid-cols-12 bg-teal-400">
                <div className="col-span-1 md:col-span-3 xl:col-span-2">
                    <div className="bg-teal-400 md:min-h-screen">
                        <div className='flex items-center justify-center'>
                            <img className="w-[60px]" src="https://i.ibb.co/fMbYtBt/images.png" alt="" />
                            <h1 className='text-black font-bold text-sm uppercase'>Task Planner</h1>
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10 p-6">
                            <div className="avatar">
                                <div className="w-24 rounded-full">
                                    <img referrerPolicy="no-referrer" src={user?.photoURL} />
                                </div>
                            </div>
                            <h1 className="text-xl font-semibold">{user?.displayName}</h1>
                        </div>
                        <div>
                            <div className="flex flex-col  space-y-4 pt-4 justify-center items-center">
                                <NavLink
                                    to="/dashboard/taskManagement"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-blue-500 bg-white w-full text-xl font-semibold py-3 text-center" : "text-black text-xl font-semibold text-center"
                                    }
                                >
                                    <span className="flex justify-center items-center gap-2 md:gap-0.5 lg:gap-2"><MdDashboard />Task Management</span>
                                </NavLink>
                            </div>
                        </div>
                        <div className="divider w-3/4 mx-auto"></div>
                        <div className="flex justify-center items-center pb-3 md:pb-0">
                            <NavLink
                                to="/"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "text-blue-500 bg-white w-full text-xl font-semibold md:py-3" : "text-black text-xl font-semibold"
                                }
                            >
                                <span className="flex justify-center items-center gap-2 md:gap-0.5 lg:gap-2"><IoHomeOutline /> Home</span>
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 md:col-span-8 xl:col-span-10">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;