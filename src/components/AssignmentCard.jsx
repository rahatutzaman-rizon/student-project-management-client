import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/ContextProvider';
import Swal from 'sweetalert2'
import { axiosInstance } from '../hooks/useAxios';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';

const AssignmentCard = ({assignment, refetch, refetch2}) => {
  const {user} = useContext(GlobalContext);
  const {_id, thumbnail, title, marks, difficultyLevel, author} = assignment;
  const navigate = useNavigate();

  const deleteFetcher = async() => {
    const res = await axiosInstance.delete(`/assignments/${_id}`, {headers: {Authorization: user?.email}});
    return res.data;
  }
  const {mutate, data: resData, isSuccess, isError, error} = useMutation({mutationFn: deleteFetcher});
  if (isSuccess) {
    if (resData?.deletedCount === 1) {
      refetch();
      refetch2();
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      })
    }
  }
  if (isError) {
    toast.error(error?.message);
  }

  const handleUpdate = () => {
    if (author === user?.email) {
      scrollTo(0, 0);
      navigate(`/assignments/update/${_id}`);
    }
    else {
      Swal.fire({
        title: "Not Possible!",
        text: "You can't update other's assignments",
        icon: "error",
        confirmButtonColor: "#610C9F"
      });
    }
  }
  const handleDelete = () => {
    if (author === user?.email) {
      Swal.fire({
        title: "Sure to Delete?",
        text: "Are you sure to delete this assignment!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#610C9F",
        cancelButtonColor: "#DC2626",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result?.isConfirmed) {
          mutate();
        }
      });
    }
    else {
      Swal.fire({
        title: "Not Possible!",
        text: "You can't delete other's assignments",
        icon: "error",
        confirmButtonColor: "#610C9F"
      });
    }
  }

  return (
    <div className='bg-gray-200 rounded-lg flex flex-col sm:flex-row justify-center sm:items-center'>
      <div className='w-full sm:w-2/5 max-h-[200px] h-full sm:max-h-none'>
        <img className='rounded-t-lg sm:rounded-t-none sm:!rounded-s-lg w-full h-full object-cover object-center' src={thumbnail} alt={`${title}'s thumbnail`} />
      </div>
      <div className='sm:w-3/5 p-6'>
        <h3 className='text-2xl font-medium mb-2 text-primary'>{title}</h3>
        <span className='block mb-1'><span className="font-bold">Marks:</span> {marks}</span>
        <span className='block mb-4'><span className="font-bold">Difficulty Level:</span> {difficultyLevel}</span>
        <div className='flex flex-wrap items-center gap-2'>
          <Link to={`/assignments/${_id}`} className='btn btn-primary' onClick={() => scrollTo(0, 0)}>View</Link>
          <button className='btn btn-primary btn-outline' onClick={handleUpdate}>Update</button>
          <button className='btn btn-primary !bg-red-600 !border-red-600' onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;

AssignmentCard.propTypes = {
  assignment: PropTypes.object,
  refetch: PropTypes.func,
  refetch2: PropTypes.func
}