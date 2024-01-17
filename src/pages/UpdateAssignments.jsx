import { Helmet } from "react-helmet-async";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useContext, useEffect, useState } from "react";
import { axiosInstance } from "../hooks/useAxios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../context/ContextProvider";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const assignmentFetcher = async(id, email) => {
  const res = await axiosInstance(`/assignments/${id}`, {headers: {Authorization: email}});
  return res.data;
}

const UpdateAssignments = () => {
  const {id} = useParams();
  const {user} = useContext(GlobalContext);
  const {data: assignment, isLoading} = useQuery({queryKey: ['assignment', id], queryFn: () => assignmentFetcher(id, user?.email)});
  const [dueDate, setDueDate] = useState(new Date());
  useEffect(() => {
    if (!isLoading) {
      setDueDate(new Date(assignment?.dueDate) || 0)
    }
  }, [isLoading, assignment]);
  const navigate = useNavigate();

  const updateFetcher = async(updateAssignment) => {
    const res = await axiosInstance.put(`/assignments/${id}`, updateAssignment, {headers: {Authorization: user?.email}});
    return res.data;
  }
  const {mutate, data: resData, isSuccess, isError, error} = useMutation({mutationFn: updateFetcher});
  if (isSuccess) {
    if (resData?.modifiedCount === 1) {
      toast.success("Assignment Updated");
      scrollTo(0, 0);
      navigate(`/assignments`);
    }
  }
  if (isError) {
    toast.error(error.message);
  }
  
  const handleUpdate = e => {
    e.preventDefault();
    // Form Values
    const form = e.target;
    const title = form.title.value;
    const marks = form.marks.value;
    const thumbnail = form.thumbnail.value;
    const image = form.image.value;
    const difficultyLevel = form["difficulty-level"].value;
    const description = form.description.value;
    const author = user?.email;
    const updateAssignment = {title, marks, thumbnail, image, difficultyLevel, dueDate, description, author};
    if (dueDate <= new Date()) {
      return Swal.fire({
        title: "Warning!",
        text: "You should give minimum 1 day assignment duration.",
        icon: "error",
        confirmButtonColor: "#610C9F"
      });
    }
    mutate(updateAssignment);
  }

  return (
    <main className="mt-10">
      <Helmet>
        <title>Update Assignment - StudyHub</title>
      </Helmet>
      
      <section>
        <div className="container">
          <div className="bg-gray-200 p-6 rounded-md max-w-[900px] mx-auto">
            <h2 className="text-3xl font-medium text-center mb-6">Update Assignment</h2>
            <form className="space-y-5" onSubmit={handleUpdate}>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="flex-1">
                  <label className="block font-medium mb-2" htmlFor="title">Title</label>
                  <input className="input w-full border-gray-300" type="text" name="title" id="title" placeholder="Enter assignment title" defaultValue={assignment?.title} required />
                </div>
                <div className="flex-1">
                  <label className="block font-medium mb-2" htmlFor="marks">Marks</label>
                  <input className="input w-full border-gray-300" type="number" name="marks" id="marks" placeholder="Enter assignment marks" min="1" defaultValue={assignment?.marks} required />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="flex-1">
                  <label className="block font-medium mb-2" htmlFor="thumbnail">Thumbnail URL</label>
                  <input className="input w-full border-gray-300" type="url" name="thumbnail" id="thumbnail" placeholder="Assignment thumbnail url" defaultValue={assignment?.thumbnail} required />
                </div>
                <div className="flex-1">
                  <label className="block font-medium mb-2" htmlFor="image">Image URL</label>
                  <input className="input w-full border-gray-300" type="url" name="image" id="image" placeholder="Assignment image url" defaultValue={assignment?.image} required />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="flex-1">
                  <label className="block font-medium mb-2" htmlFor="difficulty-level">Difficulty Level</label>
                  <select className="select w-full border-gray-300" name="difficulty-level" id="difficulty-level" defaultValue={assignment?.difficultyLevel} required>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block font-medium mb-2">Due Date</label>
                  <DatePicker
                    className="input w-full border-gray-300"
                    showIcon
                    selected={dueDate}
                    onChange={(date) => setDueDate(date)}
                  />
                </div>
              </div>
              <div>
                <label className="block font-medium mb-2" htmlFor="description">Description</label>
                <textarea className="textarea resize-none w-full border-gray-300 leading-normal text-base h-[120px]" name="description" id="description" placeholder="Write assignment description" defaultValue={assignment?.description} required></textarea>
              </div>
              <input className="btn btn-primary btn-block !rounded-md" type="submit" value="Update" />
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default UpdateAssignments;