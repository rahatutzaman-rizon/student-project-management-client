import PropTypes from 'prop-types';
import { useState } from 'react';
import GiveMarkModal from './GiveMarkModal';

const SubmittedAssignmentRow = ({assignment, refetch}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <tr>
        <td>{assignment?.assignmentTitle}</td>
        <td>{assignment?.authorName}</td>
        <td>{assignment?.assignmentMarks}</td>
        <td><button className="btn btn-primary !text-sm !min-h-[38px] !px-4" onClick={() => setShowModal(true)}>Give Mark</button></td>
      </tr>

      <GiveMarkModal showModal={showModal} setShowModal={setShowModal} assignment={assignment} refetch={refetch} />
    </>
  );
};

export default SubmittedAssignmentRow;

SubmittedAssignmentRow.propTypes = {
  assignment: PropTypes.object,
  refetch: PropTypes.func
}