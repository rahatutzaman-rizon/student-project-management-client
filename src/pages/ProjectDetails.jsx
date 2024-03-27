import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProjectDetails = () => {
  const { id ,_id} = useParams()
  console.log(id,_id);
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/team1/${id}`)
      .then(response => response.json())
      .then(data => setProject(data));
  }, [id,_id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  const handleAddTask = () => {
    // Implement logic to add a new task
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
        {project.name}
      </h2>
      <p className="text-gray-600 mb-4">{project.description}</p>
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Team Members</h3>
        <ul>
          {project.members.map(member => (
            <li key={member.it} className="text-gray-700">
              {member.name}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">Tasks</h3>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
              <th className="px-4 py-2">Number</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Assigned To</th>
              <th className="px-4 py-2">Deadline</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {project.tasks.map(task => (
              <tr key={task.number} className="odd:bg-gray-100 even:bg-white">
                <td className="px-4 py-2 border">{task.number}</td>
                <td className="px-4 py-2 border">{task.title}</td>
                <td className="px-4 py-2 border">
                  {project.members.find(member => member.it === task.assignedTo)?.name}
                </td>
                <td className="px-4 py-2 border">{task.deadline}</td>
                <td className="px-4 py-2 border">
                  <span
                    className={`px-2 py-1 rounded-full font-bold ${
                      task.status === 'In Progress'
                        ? 'bg-yellow-200 text-yellow-800'
                        : task.status === 'Completed'
                        ? 'bg-green-200 text-green-800'
                        : 'bg-red-200 text-red-800'
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded hover:bg-gradient-to-l hover:from-blue-500 hover:to-green-400 transition-colors duration-300"
        onClick={handleAddTask}
      >
        Add Task
      </button>
    </div>
  );
};

export default ProjectDetails;