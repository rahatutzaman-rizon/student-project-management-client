import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../hooks/useAxios";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/ContextProvider";
import SubmitAssignmentModal from "../components/SubmitAssignmentModal";

const assignmentFetcher = async(id, email) => {
  const res = await axiosInstance(`/assignments/${id}`, {headers: {Authorization: email}});
  return res.data;
}

const AssignmentDetails = () => {
  const {user} = useContext(GlobalContext);
  const {id} = useParams();
  const [showModal, setShowModal] = useState(false);
  const {data: assignment, isLoading} = useQuery({queryKey: ['assignment', id], queryFn: () => assignmentFetcher(id, user?.email)});
  const date = new Date(assignment?.dueDate);
  const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  if (isLoading) return (
    <div className="mt-12 md:mt-16 text-center">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  return (
    <main>
      <Helmet>
        <title>Assignment Details - StudyHub</title>
      </Helmet>

      <section className="mt-10">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center bg-gray-200 rounded-lg">
            <img className="self-stretch w-full sm:w-1/2  max-h-[300px] object-cover object-center rounded-t-lg sm:rounded-t-none sm:!rounded-s-lg" src={assignment?.image} alt={`${assignment.title}'s Image`} />
            <div className="w-full sm:w-1/2 p-6">
              <h2 className="text-3xl font-medium mb-4">{assignment?.title}</h2>
              <span className="block mb-1"><span className="font-bold">Marks:</span> {assignment?.marks}</span>
              <span className="block mb-1"><span className="font-bold">Due Date:</span> {date.getDate()} {monthArray[date.getMonth()]}, {date.getFullYear()}</span>
              <span className="block mb-1"><span className="font-bold">Difficulty Level:</span> {assignment?.difficultyLevel}</span>
              <button className="btn btn-primary mt-4" onClick={() => setShowModal(true)}>Take Assignment</button>
            </div>
          </div>

          <h2 className="mt-8 text-3xl font-medium mb-4">Description</h2>
          <p>{assignment?.description}</p>
        </div>
      </section>

      <SubmitAssignmentModal showModal={showModal} setShowModal={setShowModal} assignmentId={assignment?._id} assignmentTitle={assignment?.title} assignmentMarks={assignment?.marks} />
    </main>
  );
};

export default AssignmentDetails;