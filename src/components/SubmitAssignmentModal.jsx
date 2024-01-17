import PropTypes from 'prop-types';
import { useContext } from 'react';
import { GlobalContext } from '../context/ContextProvider';
import { axiosInstance } from '../hooks/useAxios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

const SubmitAssignmentModal = ({showModal, setShowModal, assignmentId, assignmentTitle, assignmentMarks}) => {
  const {user} = useContext(GlobalContext);
  const navigate = useNavigate();

  const submitFetcher = async(submittedAssignment) => {
    const res = await axiosInstance.post('/submitted-assignments', submittedAssignment, {headers: {Authorization: user?.email}});
    return res.data;
  }
  const {mutate, data: resData, isSuccess, isError, error} = useMutation({mutationFn: submitFetcher});
  if (isSuccess) {
    if (resData?.insertedId) {
      toast.success("Assignment submitted !!!")
      scrollTo(0, 0);
      navigate('/my-assignments');
    }
  }
  if (isError) {
    toast.error(error?.message);
  }

  const handleSubmit = e => {
    e.preventDefault();

    const form = e.target;
    const pdfLink = form.pdfLink.value;
    const note = form.note.value;
    const status = "pending";
    const authorName = user?.displayName;
    const authorEmail = user?.email;
    const submittedAssignment = {assignmentId, assignmentTitle, assignmentMarks, pdfLink, note, status, authorName, authorEmail};
    mutate(submittedAssignment);
  }

  return (
    <section className="fixed w-screen h-screen left-0 right-0 bg-black bg-opacity-40 flex justify-center items-center transition-[top] duration-300 z-40" style={showModal ? {top: "0px"} : {top: "-120%"}}>
      <form className="bg-white w-full max-w-[500px] m-6 p-6 rounded-lg" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-medium mb-6 text-center">Submit Assignment</h2>
        <label className="font-semibold block mb-2" htmlFor="pdfLink">PDF Link</label>
        <input className="input w-full border-gray-300 mb-4" type="url" name="pdfLink" id="pdfLink" placeholder="Your assignment's pdf link" required />

        <label className="font-semibold block mb-2" htmlFor="note">Note (Optional)</label>
        <textarea className="input resize-none pt-2 h-[100px] w-full border-gray-300 mb-4" name="note" id="note" placeholder="Add note"></textarea>

        <div className="flex justify-center items-center gap-2">
          <button className="btn btn-primary" type="submit">Submit</button>
          <button className="btn btn-primary btn-outline" onClick={() => setShowModal(false)} type='button'>Close</button>
        </div>
      </form>
    </section>
  );
};

export default SubmitAssignmentModal;

SubmitAssignmentModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  assignmentId: PropTypes.string,
  assignmentTitle: PropTypes.string,
  assignmentMarks: PropTypes.string
}