import { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { Link, useParams } from 'react-router-dom';
import { Modal, Button, Label, TextInput, Textarea, Select } from 'flowbite-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProjectDetails = () => {
  const { id, team } = useParams();
  const [project, setProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showStatisticsModal, setShowStatisticsModal] = useState(false);
  const [newTask, setNewTask] = useState({
    number: '',
    title: '',
    description: '',
    deadline: '',
    assignedTo: '',
    status: 'Not Started',
  });
  const [activeTab, setActiveTab] = useState('description');
  const [activeButton, setActiveButton] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/${team}/${id}`)
      .then((response) => response.json())
      .then((data) => setProject(data));
  }, [id, team]);

  if (!project) {
    return <div>Loading...</div>;
  }

  const handleInputChange = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.name === 'number' ? parseInt(e.target.value, 10) : e.target.value,
    });
  };

  const handleAddTask = async () => {
    try {
      const response = await fetch(`http://localhost:5000/add-task/${team}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        // Reset the new task state
        setNewTask({
          number: '',
          title: '',
          description: '',
          deadline: '',
          assignedTo: '',
          status: 'Not Started',
        });
        setShowModal(false);

        // Fetch the updated project data
        const updatedProject = await fetch(`http://localhost:5000/${team}/${id}`)
          .then((res) => res.json());
        setProject(updatedProject);
        toast.success('Task added successfully!');
      } else {
        console.error('Failed to add task');
        toast.error('Failed to add task');
      }
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('Error adding task');
    }
  };

  const handleDeleteTask = async (taskNumber) => {
    try {
      const response = await fetch(`http://localhost:5000/delete-task/${team}/${id}/${taskNumber}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Fetch the updated project data
        const updatedProject = await fetch(`http://localhost:5000/${team}/${id}`)
          .then((res) => res.json());
        setProject(updatedProject);
        toast.success('Task deleted successfully!');
      } else {
        console.error('Failed to delete task');
        toast.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Error deleting task');
    }
  };

  const handleStatusUpdate = async (taskNumber, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/update-task-status/${team}/${id}/${taskNumber}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Fetch the updated project data
        const updatedProject = await fetch(`http://localhost:5000/${team}/${id}`)
          .then((res) => res.json());
        setProject(updatedProject);
        toast.success('Task status updated successfully!');
      } else {
        console.error('Failed to update task status');
        toast.error('Failed to update task status');
      }
    } catch (error) {
      console.error('Error updating task status:', error);
      toast.error('Error updating task status');
    }
  };

  const calculateTaskStatistics = () => {
    const completedTasks = project.tasks.filter((task) => task.status === 'Completed').length;
    const inProgressTasks = project.tasks.filter((task) => task.status === 'In Progress').length;
    const notStartedTasks = project.tasks.filter((task) => task.status === 'Not Started').length;
    const totalTasks = project.tasks.length;
    return { totalTasks, completedTasks, inProgressTasks, notStartedTasks };
  };

  const statistics = calculateTaskStatistics();

  const chartData = {
    labels: ['Completed', 'In Progress', 'Not Started'],
    datasets: [
      {
        data: [statistics.completedTasks, statistics.inProgressTasks, statistics.notStartedTasks],
        backgroundColor: ['#4caf50', '#ffeb3b', '#f44336'],
        hoverBackgroundColor: ['#388e3c', '#fbc02d', '#e53935'],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Tasks Progress',
        font: {
          size: 20,
        },
      },
    },
  };

  const openStatisticsModal = () => {
    setShowStatisticsModal(true);
  };

  const closeStatisticsModal = () => {
    setShowStatisticsModal(false);
  };

  const overallPerformance = () => {
    const totalTasks = statistics.totalTasks;
    const completedTasks = statistics.completedTasks;
    const performancePercentage = ((completedTasks / totalTasks) * 100).toFixed(2);
    return `${performancePercentage}%`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />

      <button className=''>
    
      <Link
              to={`/project`}
              className="inline-block mt-2 bg-pink-300 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded"
            >
              Back 
            </Link>
      </button>
      <h2 className="text-3xl font-bold  mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
        {project.name}
      </h2>
      <p className="text-gray-600 mb-4">{project.description}</p>
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Team Members</h3>
        <ul>
          {project.members.map((member) => (
            <li key={member.id} className="text-gray-700">
              {member.name}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="flex mb-4">
          <button
            className={`px-4 py-2 rounded-l ${
              activeButton === 'description'
                ? 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => {
              setActiveButton('description');
              setActiveTab('description');
            }}
          >
            Description
          </button>
          <button
            className={`px-4 py-2 ${
              activeButton === 'tasks'
                ? 'bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
           }`}
           onClick={() => {
             setActiveButton('tasks');
             setActiveTab('tasks');
           }}
         >
           Tasks
         </button>
         <button
           className={`px-4 py-2 rounded-r ${
             activeButton === 'statistics'
               ? 'bg-gradient-to-r from-orange-500 via-yellow-500 to-pink-500 text-white'
               : 'bg-gray-200 hover:bg-gray-300'
           }`}
           onClick={() => {
             setActiveButton('statistics');
             setActiveTab('statistics');
           }}
         >
           Statistics
         </button>
       </div>

       {/* Tab Content */}
       <div className="flex-grow overflow-auto">
         {activeTab === 'description' && (
           <div>
             <h3 className="text-xl font-bold mb-2">Description:</h3>
             <p>{project.description}</p>

             <h3 className="text-xl font-bold mt-4 mb-2">Members:</h3>
             <ul className="list-disc pl-4">
               {project.members.map((member) => (
                 <li key={member.id}>{member.name}</li>
               ))}
             </ul>
           </div>
         )}

         {activeTab === 'tasks' && (
           <div>
             <h3 className="text-xl font-bold mb-2">Tasks:</h3>
             <table className="w-full table-auto">
               <thead>
                 <tr className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                   <th className="px-4 py-2">Number</th>
                   <th className="px-4 py-2">Title</th>
                   <th className="px-4 py-2">Deadline</th>
                   <th className="px-4 py-2">Status</th>
                   <th className="px-4 py-2">Action</th>
                 </tr>
               </thead>
               <tbody>
                 {project.tasks.map((task) => (
                   <tr key={task.number} className="odd:bg-gray-100 even:bg-white">
                     <td className="px-4 py-2 border">{task.number}</td>
                     <td className="px-4 py-2 border">{task.title}</td>
                     <td className="px-4 py-2 border">{task.deadline}</td>
                     <td className="px-4 py -2 border">
                       <span
                         className={`px-2 py-1 rounded-full font-bold bg-white ${
                           task.status === 'In Progress'
                             ? 'bg-yellow-200 text-yellow-800'
                             : task.status === 'Completed'
                             ? 'bg-green-200 text-green-800'
                             : 'bg-red-200 text-red-400'
                         }`}
                       >
                         {task.status}
                       </span>
                     </td>
                     <td className="px-4 py-2 border flex gap-2">
                       <Button color="failure" onClick={() => handleDeleteTask(task.number)}>
                         Delete
                       </Button>
                       <Select
                         value={task.status}
                         onChange={(e) => handleStatusUpdate(task.number, e.target.value)}
                       >
                         <option value="Not Started">Not Started</option>
                         <option value="In Progress">In Progress</option>
                         <option value="Completed">Completed</option>
                       </Select>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         )}

         {activeTab === 'statistics' && (
           <div>
             <h3 className="text-xl font-bold mb-2">Statistics:</h3>
             <ul className="list-disc pl-4">
               <li>Total Tasks: {statistics.totalTasks}</li>
               <li>Completed Tasks: {statistics.completedTasks}</li>
               <li>In Progress Tasks: {statistics.inProgressTasks}</li>
               <li>Not Started Tasks: {statistics.notStartedTasks}</li>
             </ul>

             <h3 className="text-xl font-bold mt-4 mb-2">Overall Progress:</h3>
             <p>{overallPerformance()}</p>

             <h3 className="text-xl font-bold mt-4 mb-4">Task Statistics:</h3>
             <div className="h-64">
               <Pie data={chartData} options={options} />
             </div>
           </div>
         )}
       </div>
     </div>

     <div className="mt-4">
       <Button onClick={() => setShowModal(true)}>Add Task</Button>
     </div>

     <Modal show={showModal} onClose={() => setShowModal(false)}>
       <Modal.Header>Add New Task</Modal.Header>
       <Modal.Body>
         <div className="space-y-6">
           <div>
             <div className="mb-2 block">
               <Label htmlFor="number" value="Task Number" />
             </div>
             <TextInput
               id="number"
               name="number"
               value={newTask.number}
               onChange={handleInputChange}
               type="number"
               required
             />
           </div>
           <div>
             <div className="mb-2 block">
               <Label htmlFor="title" value="Task Title" />
             </div>
             <TextInput
               id="title"
               name="title"
               value={newTask.title}
               onChange={handleInputChange}
               type="text"
               required
             />
           </div>
           <div>
             <div className="mb-2 block">
               <Label htmlFor="description" value="Task Description" />
             </div>
             <Textarea
               id="description"
               name="description"
               value={newTask.description}
               onChange={handleInputChange}
               required
             />
           </div>
           <div>
             <div className="mb-2 block">
               <Label htmlFor="deadline" value="Deadline" />
             </div>
             <TextInput
               id="deadline"
               name="deadline"
               value={newTask.deadline}
               onChange={handleInputChange}
               type="date"
               required
             />
           </div>
           <div>
             <div className="mb-2 block">
               <Label htmlFor="status" value="Status" />
             </div>
             <Select
               id="status"
               name="status"
               value={newTask.status}
               onChange={handleInputChange}
               required
             >
               <option value="Not Started">Not Started</option>
               <option value="In Progress">In Progress</option>
               <option value="Completed">Completed</option>
             </Select>
           </div>
         </div>
       </Modal.Body>
       <Modal.Footer>
         <Button color="failure" onClick={() => setShowModal(false)}>
           Close
         </Button>
         <Button color="success" onClick={handleAddTask}>
           Submit
         </Button>
       </Modal.Footer>
     </Modal>

     <Modal
       isOpen={showStatisticsModal}
       onRequestClose={closeStatisticsModal}
       className="fixed inset-0 flex items-center justify-center z-50"
       overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
     >
       <div className="bg-white rounded-lg p-8 max-w-3xl">
         <div className="flex justify-between items-center mb-6">
           <h2 className="text-2xl font-bold">Task Statistics</h2>
           <Button color="primary" onClick={closeStatisticsModal}>
             Close
           </Button>

</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Statistical Result</h3>
              <ul className="space-y-2">
                <li>
                  <span className="font-bold">Total Tasks:</span> {statistics.totalTasks}
                </li>
                <li>
                  <span className="font-bold">Completed Tasks:</span> {statistics.completedTasks}
                </li>
                <li>
                  <span className="font-bold">In Progress Tasks:</span> {statistics.inProgressTasks}
                </li>
                <li>
                  <span className="font-bold">Not Started Tasks:</span> {statistics.notStartedTasks}
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Overall Performance</h3>
              <div className="bg-green-100 text-green-800 rounded-full py-4 px-8">
                <span className="text-4xl font-bold">{overallPerformance()}</span>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Task Progress Chart</h3>
            <div className="h-64">
              <Pie data={chartData} options={options} />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectDetails;

