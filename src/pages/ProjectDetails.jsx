import { useState, useEffect, useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { Link, useParams } from 'react-router-dom';
import { Modal, Button, Label, TextInput, Textarea, Select, Tooltip } from 'flowbite-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalContext } from '../context/ContextProvider';

const ProjectDetails = () => {
  const { id, team } = useParams();
  const [project, setProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showStatisticsModal, setShowStatisticsModal] = useState(false);
  const {user} = useContext(GlobalContext);
  console.log(user)
  const [newTask, setNewTask] = useState({
    number: '',
    title: '',
    description: '',
    start_date: '',
    deadline: '',
    assignedTo: '',
    status: 'Not Started',
  });
  const [activeTab, setActiveTab] = useState('description');
  const [activeButton, setActiveButton] = useState('');

  useEffect(() => {
    fetch(`https://student-project-management-server.vercel.app/${team}/${id}`)
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
      const response = await fetch(`https://student-project-management-server.vercel.app/add-task/${team}/${id}`, {
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
          start_date: '',
          status: 'Not Started',
        });
        setShowModal(false);

        // Fetch the updated project data
        const updatedProject = await fetch(`https://student-project-management-server.vercel.app/${team}/${id}`)
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
      const response = await fetch(`https://student-project-management-server.vercel.app/delete-task/${team}/${id}/${taskNumber}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Fetch the updated project data
        const updatedProject = await fetch( `https://student-project-management-server.vercel.app/${team}/${id}`)
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
      const response = await fetch(`https://student-project-management-server.vercel.app/update-task-status/${team}/${id}/${taskNumber}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Fetch the updated project data
        const updatedProject = await fetch(`https://student-project-management-server.vercel.app/${team}/${id}`)
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
        backgroundColor: ['#4cad88', '#ffbb3b', '#f44336'],
        hoverBackgroundColor: ['#388e3c', '#fbc02d', '#e53935'],
        font: {
          size: 40,
        },
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
          size: 40,
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
              className="inline-block mt-2 mb-2 bg-pink-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
            >
              Back 
            </Link>
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl shadow-lg p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Supervisor</h2>
        <p className="text-2xl font-extrabold text-white">{project.teacher}</p>
        <p className="text-xl font-bold text-white">{project.designation}</p>
      </div>
      <div className="bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl shadow-lg p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Group NO : {project.team}</h2>
        <p className="text-2xl font-bold text-white">  </p>
           <p className="text-2xl font-bold text-white">  {project.members[0].name}</p>
            <p className="text-2xl font-bold text-white">  {project.members[1].name}</p>
            
      </div>
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl shadow-lg p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Total Tasks: {statistics.totalTasks}</h2>
        <p className="text-2xl font-bold text-white">Completed Tasks: {statistics.completedTasks} </p>
      </div>
    </div>


      <h2 className="text-3xl mt-12 font-bold  mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
        {project.name}
      </h2>
      <h2 className="text-3xl mt-4 font-bold  mb-4 bg-gradient-to-r from-teal-500 to-pink-500 text-transparent bg-clip-text">
        Type:   {project.work}  
      </h2>
      
    
     
      <div>
  <div className="flex mb-4">
    <button
      className={`px-4 py-2 rounded-l ${
        activeButton === 'description'
          ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white'
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
          ? 'bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 text-white'
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
      className={`px-4 py-2 rounded-r  ${
        activeButton === 'statistics'
          ? 'bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white'
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
        <h3 className="text-2xl font-bold mb-4 text-indigo-500 mt-2">Description:</h3>
        <p className='text-purple-700 font-semibold'>{project.description}</p>

        <div className=" mt-4 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 p-6 rounded-lg shadow-lg">
  <h3 className="text-xl font-bold mb-4  text-white">Team Members</h3>
  <ul>
    {project.members.map((member) => (
      <li
        key={member.id}
        className="bg-white rounded-lg p-4 mb-4 shadow-md text-black text-xl"
      >
        <span className="font-bold">Member Name: {member.name}</span>
        <br />
        ID: {member.it}
        <br />
        Email: {member.mail}
        <br />
        Contact: {member.contact}
      </li>
    ))}
  </ul>
</div>

      </div>
    )}

    {activeTab === 'tasks' && (
      <div>
        <h3 className="text-xl font-bold mb-2 text-teal-500">Tasks:</h3>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gradient-to-r from-green-500 to-cyan-500 text-white">
              <th className="px-4 py-2">Number</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2"> Start to Deadline date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {project.tasks.map((task) => (
              <tr key={task.number} className="odd:bg-gray-100 even:bg-white">
                <td className="px-4 py-2 border">{task.number}</td>
                <td className="px-4 py-2 border">{task.title}</td>
                <td className="px-4 py-2 border">
                  <Tooltip content={task.description}>
                    <Button>Description</Button>
                  </Tooltip>
                </td>
                <td className="px-4 py-2 border">
                  {task.start_date} to {task.deadline}
                </td>
                <td className="px-4 py-2 border">
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
      <div className="bg-gradient-to-r from-indigo-500 to-purple-700 rounded-lg p-6 shadow-lg">
  <h3 className="text-2xl font-bold mb-4 text-white">Project Overview</h3>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
    <div className="bg-white rounded-lg p-4 shadow-md">
      <h4 className="text-2xl font-semibold text-gray-700 mb-2">Total Tasks</h4>
      <p className="text-3xl font-bold text-indigo-600">{statistics.totalTasks}</p>
    </div>
    <div className="bg-white rounded-lg p-4 shadow-md">
      <h4 className="text-2xl font-semibold text-gray-700 mb-2">Completed Tasks</h4>
      <p className="text-3xl font-bold text-green-600">{statistics.completedTasks}</p>
    </div>
    <div className="bg-white rounded-lg p-4 shadow-md">
      <h4 className="text-2xl font-semibold text-gray-700 mb-2">In Progress Tasks</h4>
      <p className="text-3xl font-bold text-yellow-600">{statistics.inProgressTasks}</p>
    </div>
    <div className="bg-white rounded-lg p-4 shadow-md">
      <h4 className="text-2xl font-semibold text-gray-700 mb-2">Not Started Tasks</h4>
      <p className="text-3xl font-bold text-red-600">{statistics.notStartedTasks}</p>
    </div>
  </div>
  <div className="bg-white rounded-lg p-6 shadow-md">
    <h3 className="text-2xl font-bold mb-4 text-gray-700">Overall Progress</h3>
    <p className="text-3xl text-pink-600">{overallPerformance()}</p>
  </div>
  <div className="bg-white rounded-lg p-6 shadow-md mt-6">
    <h3 className="text-3xl font-bold mb-4 text-teal-700">Task Statistics</h3>
    <div className="h-64">
      <Pie data={chartData} options={options} />
    </div>
  </div>
</div>
    )}
  </div>
</div>
     
     <div className="mt-4">
       <Button onClick={() => setShowModal(true)}>Add Task with Email</Button>
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
               <Label htmlFor="start_date" value="start_date" />
             </div>
             <TextInput
               id="start_date"
               name="start_date"
               value={newTask.start_date}
               onChange={handleInputChange}
               type="date"
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
           Submit with Email
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
         
          
        </div>
      </Modal>
    </div>
  );
};

export default ProjectDetails;

