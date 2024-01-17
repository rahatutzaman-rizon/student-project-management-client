import { useNavigate, useParams } from "react-router-dom";
import usePreviousTask from "../../hooks/usePreviousTask";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Move = () => {

    const { id } = useParams();
    const [data, setData] = useState({})
    const [previousTask, isPrevious] = usePreviousTask();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    useEffect(() => {
        const task = previousTask?.find(item => item?._id === id);
        setData(task);
    }, [previousTask, id])

    if (isPrevious) {
        return <Loading />
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const title = data?.title;
        const description = data?.description;
        const email = data?.email;
        const priority = data?.priority;
        const deadline = data?.deadline;
        const status = e.target.status.value;
        const taskDetails = { title, description, email, priority, deadline, status }
        const res = await axiosSecure.put(`/statusChange/${id}`, taskDetails);
        if (res?.data?.modifiedCount) {
            Swal.fire({
                title: "Success!",
                text: `You successfully moved your task to ${status}.`,
                icon: "success"
            });
            navigate("/dashboard/taskManagement")
        }
    }

    return (
        <div>
            <h1 className="text-center font-bold text-xl md:text-2xl lg:text-3xl py-6">Please select where you want to move this task</h1>
            <form className="max-w-screen-xl mx-auto" onSubmit={handleSubmit}>
                <div className="flex justify-center items-center">
                    <select name="status" className="border w-3/4 mt-12 mb-6 py-3 rounded-lg">
                        <option value="todo">TODO</option>
                        <option value="ongoing">ONGOING</option>
                        <option value="completed">COMPLETED</option>
                    </select>
                </div>
                <div className="flex justify-center items-center">
                    <input className="py-1.5 rounded w-3/4 bg-[#b63327] text-white hover:text-[#b63327] hover:bg-white hover:border hover:border-[#b63327] text-xs md:text-base" type="submit" value="Move" />
                </div>
            </form>
        </div>
    );
};

export default Move;