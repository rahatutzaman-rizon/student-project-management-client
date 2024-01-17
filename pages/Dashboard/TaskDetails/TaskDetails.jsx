import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";
import usePreviousTask from "../../../hooks/usePreviousTask";
import Loading from "../../../components/Loading";
import { useEffect, useState } from "react";

const TaskDetails = () => {

    const { user } = useAuth();

    const email = user?.email;
    const [previousTask, isPrevious] = usePreviousTask();
    const [onGoing, setOngoing] = useState([])
    const [completed, setCompleted] = useState([])
    const [added, setAdded] = useState([]);

    useEffect(()=>{
        const task = previousTask.filter(item => item?.email === email);
        setAdded(task);
        const ongoing = added.filter(ongo => ongo.status === "ongoing");
        setOngoing(ongoing);
        const completed = added.filter(com => com.status === "completed");
        setCompleted(completed);
    },[email, previousTask, added])

    if(isPrevious){
        return <Loading />
    }

    

    return (
        <div>
            <Helmet>
                <title>Task Details </title>
            </Helmet>
            <h1 className="text-2xl md:text-3xl font-bold pt-6 text-center">Task Details</h1>
            <section className="bg-white">
                <div className="px-4 py-12 sm:px-6 md:py-16 lg:px-8">
                    <div>
                        <dl className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                            <div className="flex flex-col rounded-lg bg-blue-100 px-4 py-8 text-center">
                                <dt className="order-last text-lg font-medium text-gray-500">
                                    <span className="pt-6 flex justify-center items-center gap-3">My Total  Tasks</span>
                                </dt>

                                <dd className="text-4xl font-extrabold text-[#b63327] md:text-5xl">
                                    {added?.length}
                                </dd>
                            </div>

                            <div className="flex flex-col rounded-lg bg-blue-100 px-4 py-8 text-center">
                                <dt className="order-last text-lg font-medium text-gray-500">
                                    <span className="pt-6 flex justify-center items-center gap-3">Tasks You Are Doing</span>
                                </dt>

                                <dd className="text-4xl font-extrabold text-[#b63327] md:text-5xl">{onGoing?.length}</dd>
                            </div>

                            <div className="flex flex-col rounded-lg bg-blue-100 px-4 py-8 text-center">
                                <dt className="order-last text-lg font-medium text-gray-500">
                                    <span className="pt-6 flex justify-center items-center gap-3">Tasks Completed by You</span>
                                </dt>

                                <dd className="text-4xl font-extrabold text-[#b63327] md:text-5xl">{completed?.length}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TaskDetails;