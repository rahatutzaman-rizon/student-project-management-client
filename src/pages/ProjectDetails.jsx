import React, { useState, useEffect, useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalContext } from '../context/ContextProvider';

const ProjectDetails = () => {
  const { id, team } = useParams();
  const [project, setProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(GlobalContext);
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

  useEffect(() => {
    fetch(`https://student-project-management-server.vercel.app/${team}/${id}`)
      .then((response) => response.json())
      .then((data) => setProject(data));
  }, [id, team]);

  if (!project) {
    return <div className="text-center py-10">Loading...</div>;
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
        setNewTask({
          number: '',
          title: '',
          description: '',
          deadline: '',
          start_date: '',
          status: 'Not Started',
        });
        setShowModal(false);

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
        const updatedProject = await fetch(`https://student-project-management-server.vercel.app/${team}/${id}`)
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
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Tasks Progress',
        font: {
          size: 20,
          weight: 'bold',
        },
      },
    },
  };

  const overallPerformance = () => {
    const totalTasks = statistics.totalTasks;
    const completedTasks = statistics.completedTasks;
    const performancePercentage = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(2) : '0.00';
    return `${performancePercentage}%`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />

      <Link
        to="/project"
        className="inline-block mb-6 bg-[#3069a1] hover:bg-[#0074D9] text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        Back to Projects
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-[#3069a1] to-[#0074D9] rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Supervisor</h2>
          <p className="text-xl font-semibold text-white">{project.teacher}</p>
          <p className="text-lg text-white">{project.designation}</p>
        </div>
        <div className="bg-gradient-to-r from-[#3069a1] to-[#0074D9] rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Group NO : {project.team}</h2>
          <p className="text-xl font-semibold text-white">{project.members[0].name}</p>
          <p className="text-xl font-semibold text-white">{project.members[1].name}</p>
        </div>
        <div className="bg-gradient-to-r from-[#3069a1] to-[#0074D9] rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Total Tasks: {statistics.totalTasks}</h2>
          <p className="text-xl font-semibold text-white">Completed Tasks: {statistics.completedTasks}</p>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-4 text-[#3069a1]">{project.name}</h2>
      <h3 className="text-2xl font-semibold mb-6 text-[#0074D9]">Type: {project.work}</h3>

      <div className="mb-8">
        <div className="flex mb-4">
          {['description', 'tasks', 'statistics'].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-2 text-lg font-semibold rounded-t-lg ${
                activeTab === tab
                  ? 'bg-[#3069a1] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          {activeTab === 'description' && (
            <div>
              <h3 className="text-2xl font-bold mb-4 text-[#3069a1]">Description:</h3>
              <p className="text-lg text-gray-700 mb-6">{project.description}</p>

              <div className="bg-gradient-to-r from-[#3069a1] to-[#0074D9] p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-white">Team Members</h3>
                <ul className="space-y-4">
                  {project.members.map((member) => (
                    <li
                      key={member.id}
                      className="bg-white rounded-lg p-4 shadow-md text-gray-800"
                    >
                      <p className="text-xl font-bold mb-2">{member.name}</p>
                      <p className="text-lg">ID: {member.it}</p>
                      <p className="text-lg">Email: {member.mail}</p>
                      <p className="text-lg">Contact: {member.contact}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div>
              <h3 className="text-2xl font-bold mb-4 text-[#3069a1]">Tasks:</h3>
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-[#3069a1] text-white">
                    <th className="px-4 py-2">Number</th>
                    <th className="px-4 py-2">Title</th>
                    <th className="px-4 py-2">Description</th>
                    <th className="px-4 py-2">Start to Deadline</th>
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
                        <button
                          className="bg-[#3069a1] text-white px-3 py-1 rounded hover:bg-[#0074D9]"
                          onClick={() => alert(task.description)}
                        >
                          View
                        </button>
                      </td>
                      <td className="px-4 py-2 border">
                        {task.start_date} to {task.deadline}
                      </td>
                      <td className="px-4 py-2 border">
                        <span
                          className={`px-2 py-1 rounded-full font-semibold ${
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
                      <td className="px-4 py-2 border">
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded mr-2 hover:bg-red-600"
                          onClick={() => handleDeleteTask(task.number)}
                        >
                          Delete
                        </button>
                        <select
                          value={task.status}
                          onChange={(e) => handleStatusUpdate(task.number, e.target.value)}
                          className="border rounded px-2 py-1"
                        >
                          <option value="Not Started">Not Started</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'statistics' && (
            <div className="bg-gradient-to-r from-[#3069a1] to-[#0074D9] rounded-lg p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-white">Project Overview</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Tasks" value={statistics.totalTasks} color="bg-blue-500" />
                <StatCard title="Completed Tasks" value={statistics.completedTasks} color="bg-green-500" />
                <StatCard title="In Progress Tasks" value={statistics.inProgressTasks} color="bg-yellow-500" />
                <StatCard title="Not Started Tasks" value={statistics.notStartedTasks} color="bg-red-500" />
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md mb-8">
                <h3 className="text-2xl font-bold mb-4 text-[#3069a1]">Overall Progress</h3>
                <p className="text-4xl font-bold text-[#0074D9]">{overallPerformance()}</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
  <h3 className="text-2xl font-bold mb-4 text-[#3069a1]">Task Statistics</h3>
  <div className="h-64">
    <Pie data={chartData} options={options} />
  </div>
</div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#3069a1] hover:bg-[#0074D9] text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Add Task
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg p-8 max-w-md md:max-w-4xl  w-full">
            <h2 className="text-2xl font-bold mb-4 text-[#3069a1] mt-12">Add New Task</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAddTask(); }}>
              <div className="mb-4">
                <label htmlFor="number" className="block text-sm font-medium text-gray-700">Task Number</label>
                <input
                  type="number"
                  id="number"
                  name="number"
                  value={newTask.number}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3069a1] focus:ring focus:ring-[#3069a1] focus:ring-opacity-50"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Task Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newTask.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3069a1] focus:ring focus:ring-[#3069a1] focus:ring-opacity-50"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Task Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={newTask.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3069a1] focus:ring focus:ring-[#3069a1] focus:ring-opacity-50"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  id="start_date"
                  name="start_date"
                  value={newTask.start_date}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3069a1] focus:ring focus:ring-[#3069a1] focus:ring-opacity-50"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">Deadline</label>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={newTask.deadline}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3069a1] focus:ring focus:ring-[#3069a1] focus:ring-opacity-50"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  id="status"
                  name="status"
                  value={newTask.status}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3069a1] focus:ring focus:ring-[#3069a1] focus:ring-opacity-50"
                  required
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#3069a1] hover:bg-[#0074D9] text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ title, value, color }) => (
  <div className={`${color} rounded-lg p-4 text-white`}>
    <h4 className="text-lg font-semibold mb-2">{title}</h4>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

export default ProjectDetails;

