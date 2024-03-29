import { Helmet } from "react-helmet-async";
import { axiosInstance } from "../hooks/useAxios";
import { useContext } from "react";
import { GlobalContext } from "../context/ContextProvider";
import { useQuery } from "@tanstack/react-query";
import emptyIcon from '../assets/images/empty.png';
import SubmittedAssignmentRow from "../components/SubmittedAssignmentRow";

const submittedAssignmentsFetcher = async(email) => {
  const res = await axiosInstance('/submitted-assignments', {headers: {Authorization: email}})
  return res.data;
}

const SubmittedAssignments = () => {
  const {user} = useContext(GlobalContext);
  const {data: submittedAssignments, isLoading, refetch} = useQuery({queryKey: ["submitted-assignments"], queryFn: () => submittedAssignmentsFetcher(user?.email)});

  if (isLoading) return (
    <div className="mt-12 md:mt-16 text-center">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  if (!submittedAssignments?.length) return (
    <div className="mt-10 text-center">
      <Helmet>
        <title>Submitted Assignments - StudyHub</title>
      </Helmet>
      <div className="container">
        <img className="w-[150px] mx-auto mb-4" src={emptyIcon} alt="Empty Icon" />
        <h3 className="text-2xl sm:text-3xl font-medium">No Assignment Found !!!</h3>
      </div>
    </div>
  );

  return (
    <main>
      <Helmet>
        <title>Submitted Assignments - StudyHub</title>
      </Helmet>

      <section className="mt-10">
        <div className="container">
          <h2 className="text-3xl font-medium text-primary text-center mb-6">Submitted Assignments</h2>

          <div className="overflow-auto">
            <table className="w-full min-w-[700px] max-w-[900px] mx-auto text-center border border-gray-500 [&_tr]:border-t [&_tr]:border-gray-500 [&_th]:py-3 [&_td]:py-2 [&_th]:px-4 [&_td]:px-4">
              <thead className="bg-primary text-white">
                <tr>
                  <th>Title</th>
                  <th>Examinee</th>
                  <th>Total Marks</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  submittedAssignments?.map(assignment => <SubmittedAssignmentRow key={assignment?._id} assignment={assignment} refetch={refetch} />)
                }
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SubmittedAssignments;
