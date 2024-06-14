import axios from "axios";

const axiosSecure = axios.create({
    baseURL : "https://student-project-management-server.vercel.app/"
})

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;