import { Helmet } from "react-helmet-async";
import usePreviousTask from "../../../hooks/usePreviousTask";
import Loading from "../../../components/Loading";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { BiTransferAlt } from "react-icons/bi";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const PreviousTask = () => {

    const [previousTask, isPrevious, refetch] = usePreviousTask();
    const axiosSecure = useAxiosSecure();

    if (isPrevious) {
        return <Loading />
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/taskDelete/${id}`)
                if (res?.data?.deletedCount) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    refetch();
                }
            }
        });
    }

    return (
        <div>
          <DndProvider backend={HTML5Backend}>
            <Helmet>
                <title>Previous Tasks.</title>
            </Helmet>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:px-12 py-6 bg-sky-300">
                <div>
                    <h1 className="font-bold text-center">TODO</h1>
                    {
                        previousTask?.map(task => task?.status === "todo" && <div className="border items-center flex p-3 rounded-lg my-3 justify-between" key={task?._id}>
                            <div>
                                <h1 className="font-semibold">Title: {task?.title}</h1>
                                <h3 className="font-medium">Deadline: {task?.deadline}</h3>
                                <p>{task?.priority}</p>
                                <p>{task?.description.length > 20 ? task?.description.slice(0, 20) : task?.description}...</p>
                                <p>Task Added By : <span className="font-semibold">{task?.email}</span></p>
                            </div>
                            <div className="flex flex-col justify-between items-center gap-4">
                                <button onClick={() => handleDelete(task?._id)} className="py-1 px-2 rounded bg-[#b63327] text-white hover:text-[#b633124] hover:bg-white"><MdOutlineDeleteOutline size={16} /></button>
                                <Link to={`/dashboard/update/${task?._id}`}><button className="py-1 px-2 rounded bg-[#b63327] text-white hover:text-[#b63327] hover:bg-white"><MdEdit size={16} /></button></Link>
                                <Link to={`/dashboard/move/${task?._id}`}>
                                    <button className="py-1 px-2 rounded flex flex-row gap-1 items-center justify-center bg-[#b63327] text-white hover:text-[#b63327] hover:bg-white hover:border hover:border-[#b63327] text-xs"><BiTransferAlt />Move Task To</button>
                                </Link>
                            </div>
                        </div>)
                    }
                </div>
                <div>
                    <h1 className="font-bold text-center">ONGOING</h1>
                    {
                        previousTask?.map(task => task?.status === "ongoing" && <div className="border items-center flex p-3 rounded-lg my-3 justify-between" key={task?._id}>
                            <div>
                                <h1 className="font-semibold">Title: {task?.title}</h1>
                                <h3 className="font-medium">Deadline: {task?.deadline}</h3>
                                <p>{task?.priority}</p>
                                <p>{task?.description.length > 20 ? task?.description.slice(0, 20) : task?.description}...</p>
                                <p>Task Added By : <span className="font-semibold">{task?.email}</span></p>
                            </div>
                            <div className="flex flex-col justify-between items-center gap-6">
                                <button onClick={() => handleDelete(task?._id)} className="py-1 px-2 rounded bg-[#b63327] text-white hover:text-[#b63327] hover:bg-white"><MdOutlineDeleteOutline size={16} /></button>
                                <Link to={`/dashboard/update/${task?._id}`}><button className="py-1 px-2 rounded bg-[#b63327] text-white hover:text-[#b63327] hover:bg-white"><MdEdit size={16} /></button></Link>
                                <Link to={`/dashboard/move/${task?._id}`}>
                                    <button className="py-1 px-2 rounded flex flex-row gap-1 items-center justify-center bg-[#b63327] text-white hover:text-[#b63327] hover:bg-white hover:border hover:border-[#b63327] text-xs"><BiTransferAlt />Move Task To</button>
                                </Link>
                            </div>
                        </div>)
                    }
                </div>
                <div>
                    <h1 className="font-bold text-center">Completed</h1>
                    {
                        previousTask?.map(task => task?.status === "completed" && <div className="border items-center flex p-6 rounded-lg my-4 justify-between" key={task?._id}>
                            <div>
                                <h1 className="font-semibold">Title: {task?.title}</h1>
                                <h3 className="font-medium">Deadline: {task?.deadline}</h3>
                                <p>{task?.priority}</p>
                                <p>{task?.description.length > 20 ? task?.description.slice(0, 20) : task?.description}...</p>
                                <p>Task Added By : <span className="font-semibold">{task?.email}</span></p>
                            </div>
                            <div className="flex flex-col justify-between items-center gap-8">
                                <button onClick={() => handleDelete(task?._id)} className="py-1 px-2 rounded bg-[#b63327] text-white hover:text-[#b63327] hover:bg-white"><MdOutlineDeleteOutline size={16} /></button>
                                <Link to={`/dashboard/update/${task?._id}`}><button className="py-1 px-2 rounded bg-[#b63327] text-white hover:text-[#b63327] hover:bg-white"><MdEdit size={16} /></button></Link>
                                <Link to={`/dashboard/move/${task?._id}`}>
                                    <button className="py-1 px-2 rounded flex flex-row gap-1 items-center justify-center bg-[#b63327] text-white hover:text-[#b63327] hover:bg-white hover:border hover:border-[#b63327] text-xs"><BiTransferAlt />Move Task To</button>
                                </Link>
                            </div>
                        </div>)
                    }
                </div>
            </div>
            </DndProvider>
        </div>
       
    );
};

export default PreviousTask;