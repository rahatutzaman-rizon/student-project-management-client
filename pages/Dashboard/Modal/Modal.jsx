import usePreviousTask from "../../../hooks/usePreviousTask";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { FaPlus } from "react-icons/fa";

const Modal = () => {

    let [isOpen, setIsOpen] = useState(false)
    const [, , refetch] = usePreviousTask();

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    const {
        register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        const title = data.title;
        const description = data.description;
        const deadline = data.deadline;
        const priority = data.priority;
        const email = user?.email;
        const status = "todo";
        const taskData = { title, description, deadline, priority, email, status };
        const res = await axiosSecure.post("/createTask", taskData);
        if (res?.data?.insertedId) {
            Swal.fire({
                title: "Good job!",
                text: " created a Task successfully!",
                icon: "success"
            });
            reset();
            refetch();
        }
    }

    return (
        <div>
            <div className="flex items-center justify-center">
                <button onClick={openModal} className="flex justify-center items-center gap-2 rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"><FaPlus />Add Task</button>
            </div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <h1 className="text-2xl md:text-3xl font-bold p-6 text-center md:text-left">Add Task</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body space-y-6">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-bold text-lg">Title</span>
                    </label>
                    <input {...register("title", { required: true })}
                        type="text" placeholder="Title" className="input input-bordered" />
                    {errors.title?.type === "required" && (
                        <p className="text-red-600">Title is required</p>
                    )}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-bold text-lg">Description</span>
                    </label>
                    <textarea {...register("description", { required: true })}
                        className="border rounded-lg p-6" placeholder="Write your description here!" cols="30" rows="10"></textarea>
                    {errors.description?.type === "required" && (
                        <p className="text-red-600">Description is required</p>
                    )}
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10">
                    <div className="form-control flex-1 w-full">
                        <label className="label">
                            <span className="label-text font-bold text-lg">Deadlines</span>
                        </label>
                        <input className="py-3 border rounded-lg" type="date" {...register("deadline", { required: true })} />
                        {errors.deadline?.type === "required" && (
                            <p className="text-red-600">Deadline is required</p>
                        )}
                    </div>
                    <div className="form-control flex-1 w-full">
                        <label className="label">
                            <span className="label-text font-bold text-lg">Priority</span>
                        </label>
                        <select {...register("priority", { required: true })} className="py-3 border rounded-lg">
                            <option value="Low">Low</option>
                            <option value="Moderate">Moderate</option>
                            <option value="High">High</option>
                        </select>
                        {errors.priority?.type === "required" && (
                            <p className="text-red-600">Priority is required</p>
                        )}
                    </div>
                </div>
                <div className="form-control mt-6">
                    <input className="py-3 rounded-lg bg-[#b63327] text-white font-semibold hover:bg-white hover:text-[#b63327] hover:border hover:border-[#b63327]" type="submit" value="Create Task" />
                </div>
            </form>
                                    <div className="mt-4">
                                        <button onClick={closeModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default Modal;