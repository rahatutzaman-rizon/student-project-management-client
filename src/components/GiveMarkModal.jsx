import PropTypes from 'prop-types';
import { axiosInstance } from '../hooks/useAxios';
import { useContext, useState } from 'react';
import { GlobalContext } from '../context/ContextProvider';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import {Document, Page, pdfjs} from 'react-pdf';
import { FaCircleXmark } from 'react-icons/fa6';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const GiveMarkModal = ({showModal, setShowModal, assignment, refetch}) => {
  const {user} = useContext(GlobalContext);
  const [numPages, setNumPages] = useState();

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const updateFetcher = async(updatedAssignment) => {
    const res = await axiosInstance.put(`/submitted-assignments?id=${assignment?._id}`, updatedAssignment, {headers: {Authorization: user?.email}});
    return res.data;
  }
  const {mutate, data: resData, isSuccess, isError, error} = useMutation({mutationFn: updateFetcher});
  if (isSuccess) {
    if (resData?.modifiedCount === 1) {
      toast.success("Mark Given !!!");
      refetch();
      setShowModal(false);
    }
  }
  if (isError) {
    toast.error(error?.message);
  }

  const handleSubmit = e => {
    e.preventDefault();

    const updatedAssignment = {...assignment}
    updatedAssignment.status = "completed";
    updatedAssignment.obtainedMark = e.target.mark.value;
    updatedAssignment.feedback = e.target.feedback.value;
    delete updatedAssignment._id;
    mutate(updatedAssignment);
  }

  return (
    <section className="fixed w-screen h-screen left-0 right-0 bg-black bg-opacity-40 flex justify-center items-center transition-[top] duration-300 z-40" style={showModal ? {top: "0px"} : {top: "-120%"}}>
      <form className="formTag bg-white w-full max-w-[700px] max-h-[calc(100vh_-_2rem)] m-6 p-6 rounded-lg overflow-auto relative" onSubmit={handleSubmit}>
      <FaCircleXmark className="text-3xl text-primary absolute right-6 top-6 cursor-pointer" onClick={() => setShowModal(false)} />
        <h2 className="text-3xl font-medium mb-6 text-center">Give Mark</h2>
        <p className='text-left mb-2'><span className="font-bold">PDF Link:</span> <a className='text-blue-700 underline' href={assignment?.pdfLink} target="_blank" rel="noopener noreferrer">{assignment?.pdfLink}</a></p>
        {
          assignment?.note ? <p className='text-left'><span className='font-bold'>Note from user:</span> {assignment?.note}</p> : null
        }
        <label className="text-left font-semibold block mb-2 mt-6" htmlFor="mark">Give Mark (Out of {assignment?.assignmentMarks})</label>
        <input className="input w-full border-gray-300 mb-4" type="number" max={assignment?.assignmentMarks} name="mark" id="mark" placeholder="Give mark on the submission" required />

        <label className="text-left font-semibold block mb-2" htmlFor="feedback">Feedback</label>
        <textarea className="input resize-none pt-2 h-[100px] w-full border-gray-300 mb-4" name="feedback" id="feedback" placeholder="Add Feedback" required></textarea>

        <div className="flex justify-center items-center gap-2">
          <button className="btn btn-primary" type="submit">Submit</button>
          <button className="btn btn-primary btn-outline" onClick={() => setShowModal(false)} type='button'>Close</button>
        </div>

        <div className='overflow-x-auto'>
          <div className='mt-8 flex justify-center w-[635px]'>
            <Document file={assignment?.pdfLink} onLoadSuccess={onDocumentLoadSuccess}>
              {Array.apply(null, Array(numPages)).map((x, i) => i+1).map(page => {
                return (
                  <Page key={page} pageNumber={page} renderTextLayer={false} renderAnnotationLayer={false} />
                );
              })}
              
            </Document>
          </div>
        </div>
      </form>
    </section>
  );
};

export default GiveMarkModal;

GiveMarkModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  assignment: PropTypes.object,
  refetch: PropTypes.func
}