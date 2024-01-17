import { useNavigate, useParams } from "react-router-dom";
import usePreviousTask from "../../../hooks/usePreviousTask";
import Loading from "../../../components/Loading";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Update = () => {

    const { id } = useParams();
    const [edit, setEdit] = useState({});
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [previousTask, isPrevious] = usePreviousTask();

    useEffect(()=>{
        const task = previousTask?.find(item => item?._id === id);
        setEdit(task)
    },[id, previousTask])

    if(isPrevious){
        return <Loading />
    }

    const {_id} = edit;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const deadline = form.deadline.value;
        const priority = form.priority.value;
        const taskData = { title, description, deadline, priority };
        const res = await axiosSecure.put(`/updateTask/${_id}`, taskData);
        if(res?.data?.modifiedCount){
            Swal.fire({
                title: "Updated!",
                text: "Your task has been updated.",
                icon: "success"
            });
            navigate("/dashboard/taskManagement");
        }
    }

    return (
         <div className="px-12">
            <Helmet>
                <title>Edit Task </title>
            </Helmet>
            <h1 className="text-2xl md:text-3xl font-bold p-6 text-center md:text-left">Edit Task</h1>
            <form onSubmit={handleSubmit} className="card-body space-y-6">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-bold text-lg">Title</span>
                    </label>
                    <input name="title"
                        type="text" defaultValue={edit?.title} placeholder="Title" className="input input-bordered" required/>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-bold text-lg">Description</span>
                    </label>
                    <textarea name="description"
                        className="border rounded-lg p-6" required defaultValue={edit?.description} placeholder="Write your description here!" cols="30" rows="10"></textarea>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10">
                    <div className="form-control flex-1 w-full">
                        <label className="label">
                            <span className="label-text font-bold text-lg">Deadlines</span>
                        </label>
                        <input required defaultValue={edit?.deadline} className="py-3 border rounded-lg" type="date" name="deadline" />
                    </div>
                    <div className="form-control flex-1 w-full">
                        <label className="label">
                            <span className="label-text font-bold text-lg">Priority</span>
                        </label>
                        <select required defaultValue={edit?.priority} name="priority" className="py-3 border rounded-lg">
                            <option value="Low">Low</option>
                            <option value="Moderate">Moderate</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                </div>
                <div className="form-control mt-6">
                    <input className="py-3 rounded-lg bg-[#b63327] text-white font-semibold hover:bg-white hover:text-[#b63327] hover:border hover:border-[#b63327]" type="submit" value="Edit Task" />
                </div>
            </form>
        </div>
    );
};

export default Update;