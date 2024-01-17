import PropTypes from 'prop-types';

const MyAssignmentsRow = ({assignment}) => {
  return (
    <tr>
      <td>{assignment?.assignmentTitle}</td>
      <td><button className='bg-primary text-white py-1 px-2 rounded-md text-sm capitalize'>{assignment?.status}</button></td>
      <td>{assignment?.assignmentMarks}</td>
      <td>{assignment?.obtainedMark}</td>
      <td>{assignment?.feedback}</td>
    </tr>
  );
};

export default MyAssignmentsRow;

MyAssignmentsRow.propTypes = {
  assignment: PropTypes.object
}