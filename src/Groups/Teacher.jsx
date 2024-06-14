import { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Teacher = () => {
  const {id}=useParams();
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [activeButton, setActiveButton] = useState('');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignedTo: null,
    deadline: '',
    status: 'Not Started',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://student-project-management-server.vercel.app/${id}`);
        const data = await response.json();

        const groupsWithStatistics = data.map((group) => {
          const { tasks } = group;
          const statistics = calculateTaskStatistics(tasks);
          const progress = calculateProgress(statistics);

          return { ...group, statistics, progress };
        });

        setGroups(groupsWithStatistics);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Add appropriate error handling and user feedback
      }
    };

    fetchData();
  }, []);

  const calculateTaskStatistics = (tasks) => {
    const completedTasks = tasks.filter((task) => task.status === 'Completed').length;
    const inProgressTasks = tasks.filter((task) => task.status === 'In Progress').length;
    const notStartedTasks = tasks.filter((task) => task.status === 'Not Started').length;
    const totalTasks = tasks.length;

    return {
      totalTasks,
      completedTasks,
      inProgressTasks,
      notStartedTasks,
    };
  };

  const calculateProgress = (statistics) => {
    const { totalTasks, completedTasks } = statistics;
    if (totalTasks === 0) return '0%';
    const progressPercentage = ((completedTasks / totalTasks) * 100).toFixed(2);
    return `${progressPercentage}%`;
  };

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    setShowSidebar(true);
    setActiveTab('description');
    setActiveButton('description');
    
  };

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleAddTask = () => {

    const newTaskId = selectedGroup.tasks.length + 1;
    const updatedGroup = {
      ...selectedGroup,
      tasks: [
        ...selectedGroup.tasks,
        { ...newTask, id: newTaskId },
      ],
    };
    const updatedGroups = groups.map((group) =>
      group.id === selectedGroup.id ? updatedGroup : group
    );
    setGroups(updatedGroups);
    setNewTask({
      title: '',
      description: '',
      assignedTo: null,
      deadline: '',
      status: 'Not Started',

    });

    axios.put(`https://student-project-management-server.vercel.app/taskUpdate/${id}`, newTask)
.then(res =>{
console.log(res)
})
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
    {/* Sidebar */}
    <div className="md:w-1/4 bg-gradient-to-b from-indigo-900 to-purple-800 text-white p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Groups</h1>
      <div className="grid grid-cols-1 gap-6 md:gap-8">
  {groups.map((group) => (
    <button
      key={group.id}
      className={`relative bg-gradient-to-r ${
        selectedGroup?.id === group.id
          ? 'from-pink-300 via-purple-600 to-indigo-600'
          : 'from-yellow-400 via-orange-500 to-red-600 hover:from-yellow-500 hover:via-orange-600 hover:to-red-700'
      } rounded-lg shadow-md p-6 cursor-pointer text-left transition-colors duration-300 overflow-hidden`}
      onClick={() => handleGroupClick(group)}
    >
      <div
        className={`absolute inset-0 ${
          selectedGroup?.id === group.id
            ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-2xl'
            : 'bg-gradient-to-r from-sky-300 to-red-500'
        } rounded-lg blur-sm opacity-25`}
      ></div>
      <div className="relative z-10">
        <h2 className="text-2xl font-bold text-white mb-2">{group.name}</h2>
        <div className="flex items-center mb-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>
          <p className="text-gray-200">Members: {group.members.length}</p>
        </div>
        <div className="flex items-center mb-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-gray-200">Tasks: {group.tasks.length}</p>
        </div>
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
            <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
          </svg>
          <p className="text-gray-200">Team: {group.team}</p>
        </div>
      </div>
    </button>
  ))}
</div>
    </div>
  
    {/* Main Content */}
    <div className="md:w-3/4 p-8">
  {showSidebar && selectedGroup && (
    <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col">
      {/* Tab Buttons */}
      <div className="flex mb-4">
        <button
          className={`px-4 py-2 rounded-l ${
            activeButton === 'description'
              ? 'bg-gradient-to-r from-pink-100 to-purple-200 text-black text-3xl font-bold'
              : 'bg-gray-200 hover:bg-gray-300 transition-colors duration-300 text-black text-3xl font-bold'
          }`}
          onClick={() => {
            setActiveButton('description');
            setActiveTab('description');
          }}
        >
          <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
            Description
          </span>
        </button>
        <button
          className={`px-4 py-2 ${
            activeButton === 'tasks'
              ? 'bg-gradient-to-r from-green-200 to-blue-300 text-black text-3xl font-bold'
              : 'bg-sky-200 hover:bg-gray-300 transition-colors duration-300 text-black text-3xl font-bold'
          }`}
          onClick={() => {
            setActiveButton('tasks');
            setActiveTab('tasks');
          }}
        >
          <span className="bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text">
            Tasks
          </span>
        </button>
        <button
          className={`px-4 py-2 rounded-r ${
            activeButton === 'statistics'
              ? 'bg-gradient-to-r from-sky-100 to-yellow-300 text-black text-3xl  font-bold'
              : 'bg-pink-200 hover:bg-sky-100 transition-colors duration-300 text-3xl text-black font-bold'
          }`}
          onClick={() => {
            setActiveButton('statistics');
            setActiveTab('statistics');
          }}
        >
          <span className="bg-gradient-to-r from-orange-500 to-yellow-500 text-transparent bg-clip-text">
            Statistics
          </span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-grow overflow-auto">
        {activeTab === 'description' && (
          <div>
            <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
              Description: {selectedGroup.description}
            </h3>
            <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
              Title: {selectedGroup.name}
            </h1>

            <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
              Members:
            </h3>
            <ul className="list-disc pl-4 mb-4">
              {selectedGroup.members.map((member) => (
                <li key={member.id} className="text-gray-600 mb-2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
                    {member.name}
                  </span>
                  <br /> ID: {member.it} <br />
                  <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
                    {member.mail}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div>
            <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text">
              Tasks:
            </h3>
            <ul className="list-disc pl-4">
              {selectedGroup.tasks.map((task) => (
                <li key={task.id} className="mb-4 bg-gray-100 rounded-lg p-4">
                  <h4 className="font-bold bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text">
                    {task.title}
                  </h4>
                  <p className="text-gray-600">{task.description}</p>

                  <p className="text-gray-600">
                    Start Date:{' '}
                    <span className="bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text">
                      {task.start_date}
                    </span>{' '}
                    Deadline:{' '}
                    <span className="bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text">
                      {task.deadline}
                    </span>
                  </p>
                  <p
                    className={`font-bold ${
                      task.status === 'Completed'
                        ? 'bg-gradient-to-r from-green-500 to-green-700 text-transparent bg-clip-text'
                        : task.status === 'In Progress'
                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-700 text-transparent bg-clip-text'
                        : 'bg-gradient-to-r from-red-500 to-red-700 text-transparent bg-clip-text'
                    }`}
                  >
                    Status: {task.status}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'statistics' && (
          <div>
            <h3 className="text-2xl  text-blue-600 font-bold mb-2 bg-gradient-to-r from-orange-300 to-yellow-400 text-transparent bg-clip-text">
              Statistics:
            </h3>
            <ul className="list-disc pl-4 mb-4">
              <li className="text-gray-600">
                Total Tasks:{' '}
                <span className="bg-gradient-to-r from-orange-500 to-yellow-500 text-transparent bg-clip-text">
                  {selectedGroup.statistics.totalTasks}
                </span>
              </li>
              <li className="text-gray-600">
                Completed Tasks:{' '}
                <span className="bg-gradient-to-r from-green-500 to-green-700 text-transparent bg-clip-text">
                  {selectedGroup.statistics.completedTasks}
                </span>
              </li>
              <li className="text-gray-600">
                In Progress Tasks:{' '}
                <span className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-transparent bg-clip-text">
                  {selectedGroup.statistics.inProgressTasks}
                </span>
              </li>
              <li className="text-gray-600">
                Not Started Tasks:{' '}
                <span className="bg-gradient-to-r from-red-500 to-red-700 text-transparent bg-clip-text">
                  {selectedGroup.statistics.notStartedTasks}
                </span>
              </li>
            </ul>

            <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-green-500 to-green-700 text-transparent bg-clip-text">
              Overall Progress:
            </h3>
            <p className="text-2xl font-bold bg-gradient-to-r from-green-500 to-green-700 text-transparent bg-clip-text mb-4">
              {selectedGroup.progress}</p>
       
                <h3 className="text-xl font-bold mb-2 text-gray-800">Task Statistics:</h3>
                <PieChart data={selectedGroup.statistics} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  </div>
  );
};

const PieChart = ({ data }) => {
  const { totalTasks, completedTasks, inProgressTasks, notStartedTasks } = data;

  const chartData = {
    labels: ['Completed', 'In Progress', 'Not Started'],
    datasets: [
      {
        data: [completedTasks, inProgressTasks, notStartedTasks],
        backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Tasks Overview',
        font: {
          size: 20,
        },
      },
    },
  };

  return (
    <div className="h-64">
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default Teacher;