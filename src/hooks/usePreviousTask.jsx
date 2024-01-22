import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const usePreviousTask = () => {

    const axiosSecure = useAxiosSecure();

    const {data : previousTask = [], isPending : isPrevious, refetch } = useQuery({
        queryKey : ["allTasks"],
        queryFn : async () => {
            const res = await axiosSecure.get("/previousTask");
            return res?.data
        }
    })

    return [previousTask, isPrevious, refetch]
};

export default usePreviousTask;