import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../hooks/useAxios";
import { Helmet } from "react-helmet-async";
import AssignmentCard from "../components/AssignmentCard";
import { useState } from "react";
import emptyIcon from '../assets/images/empty.png';

const assignmentsFetcher = async(level, skip, assignmentsPerPage) => {
  const res = await axiosInstance(`/assignments?level=${level}&skip=${skip}&limit=${assignmentsPerPage}`);
  return res.data;
}
const assignmentsCountFetcher = async(level) => {
  const res = await axiosInstance(`/assignments-count?level=${level}`);
  return res.data;
}

const Assignments = () => {
  const [level, setLevel] = useState("All");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState("10");
  const {data: assignments, isLoading, refetch} = useQuery({queryKey: ['assignments', level, (page-1)*perPage+1, page*perPage], queryFn: () => assignmentsFetcher(level, page-1, perPage)});
  const {data: assignmentCount, isLoading: isLoading2, refetch: refetch2} = useQuery({queryKey: ["assignments-count", level], queryFn: () => assignmentsCountFetcher(level)});
  
  let pageTrack = [];
  if (!isLoading2) {
    for (let i = 1; i <= Math.ceil(assignmentCount / perPage); i++) {
      pageTrack.push(i);
    }
  }

  const handleOnChange = e => {
    const val = e.target.value;
    setLevel(val);
    setPage(1);
    refetch2();
    if (!isLoading2) refetch();
  }
  const handleOnChange2 = e => {
    const val = e.target.value;
    setPage(1);
    setPerPage(val);
    refetch(2);
    if (!isLoading2) refetch();
  }

  return (
    <main className="mt-10">
      <Helmet>
        <title>Assignments - StudyHub</title>
      </Helmet>

      <section>
        <div className="container">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <h2 className="text-3xl font-medium text-primary">Assignments</h2>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="font-medium">Filter: </span>
                <select className="input w-full max-w-[200px] h-[35px] border-primary cursor-pointer" onChange={handleOnChange} name="difficulty-level" id="difficulty-level">
                  <option value="All">All</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              <div>
                <select className="input w-full max-w-[200px] h-[35px] border-primary cursor-pointer" onChange={handleOnChange2} name="assignment-per-page" id="assignment-per-page" defaultValue="10">
                  <option value="5">5 per page</option>
                  <option value="10">10 per page</option>
                  <option value="15">15 per page</option>
                  <option value="20">20 per page</option>
                </select>
              </div>
            </div>
          </div>

          {
            !isLoading ? assignments?.length ? <div>
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {
                  assignments?.map(assignment => <AssignmentCard key={assignment._id} assignment={assignment} refetch={refetch} refetch2={refetch2} />)
                }
              </div>
              <div className="mt-8">
                <div className="container">
                  <nav>
                    <ul className="flex flex-wrap justify-center items-center -space-x-px text-sm">
                      <li>
                        <button className="flex items-center justify-center px-3 h-8 ml-0 leading-tight bg-white border border-gray-500 rounded-l-lg hover:bg-primary hover:text-white disabled:!bg-gray-300 disabled:!text-black disabled:cursor-not-allowed" disabled={page === 1 ? "disabled" : ""} onClick={() => {setPage(page-1);refetch();}}>Prev</button>
                      </li>
                      {
                        pageTrack?.map(pageNum => <li key={pageNum}>
                          <button className="flex items-center justify-center px-3 h-8 leading-tight bg-white border border-gray-500 hover:bg-primary hover:text-white" style={pageNum === page ? {backgroundColor: "#610C9F", color: "white"} : {}} onClick={() => {setPage(pageNum), refetch(), scrollTo(0, 0)}}>{pageNum}</button>
                        </li>)
                      }
                      <li>
                        <button className="flex items-center justify-center px-3 h-8 leading-tight bg-white border border-gray-500 rounded-r-lg hover:bg-primary hover:text-white disabled:!bg-gray-300 disabled:!text-black disabled:cursor-not-allowed" disabled={page === pageTrack?.length ? "disabled" : ""} onClick={() => {setPage(page+1);refetch();}}>Next</button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div> : <div className="mt-10 text-center">
            <div className="container">
              <img className="w-[150px] mx-auto mb-4" src={emptyIcon} alt="Empty Icon" />
              <h3 className="text-2xl sm:text-3xl font-medium">No Assignment Found !!!</h3>
            </div>
          </div> : <div className="mt-12 md:mt-16 text-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
          }
        </div>
      </section>
    </main>
  );
};

export default Assignments;