import { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Teacher = () => {
  const { id } = useParams();
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
      .then(res => {
        console.log(res)
      })
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="md:w-1/4 bg-gradient-to-b from-[#001f3f] to-[#0074D9] text-white p-4 mt-4">
        <h1 className="text-2xl font-bold mb-6 text-center">Groups</h1>
        <div className="grid grid-cols-1 gap-4">
          {groups.map((group) => (
            <button
              key={group.id}
              className={`relative bg-white bg-opacity-10 rounded-lg shadow-md p-4 cursor-pointer text-left transition-all duration-300 hover:bg-opacity-20 ${
                selectedGroup?.id === group.id ? 'ring-2 ring-white' : ''
              }`}
              onClick={() => handleGroupClick(group)}
            >
              <h2 className="text-xl font-semibold mb-2">{group.name}</h2>
              <div className="flex items-center mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <p className="text-sm">Members: {group.members.length}</p>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <p className="text-sm">Tasks: {group.tasks.length}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="md:w-3/4 p-8">
        {showSidebar && selectedGroup && (
          <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col">
            {/* Tab Buttons */}
            <div className="flex mb-6 bg-gray-200 rounded-lg p-1">
              <button
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeButton === 'description'
                    ? 'bg-[#0074D9] text-white'
                    : 'text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => {
                  setActiveButton('description');
                  setActiveTab('description');
                }}
              >
                Description
              </button>
              <button
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeButton === 'tasks'
                    ? 'bg-[#0074D9] text-white'
                    : 'text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => {
                  setActiveButton('tasks');
                  setActiveTab('tasks');
                }}
              >
                Tasks
              </button>
              <button
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeButton === 'statistics'
                    ? 'bg-[#0074D9] text-white'
                    : 'text-gray-700 hover:bg-gray-300'
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
                  <h1 className="text-2xl font-bold mb-4 text-[#001f3f]">{selectedGroup.name}</h1>
                  <p className="text-gray-600 mb-6">{selectedGroup.description}</p>
                  <h3 className="text-xl font-semibold mb-2 text-[#001f3f]">Members:</h3>
                  <ul className="space-y-2">
                    {selectedGroup.members.map((member) => (
                      <li key={member.id} className="bg-gray-100 rounded-lg p-3">
                        <p className="font-medium text-[#001f3f]">{member.name}</p>
                        <p className="text-sm text-gray-600">ID: {member.it}</p>
                        <p className="text-sm text-gray-600">{member.mail}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'tasks' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-[#001f3f]">Tasks:</h3>
                  <ul className="space-y-4">
                    {selectedGroup.tasks.map((task) => (
                      <li key={task.id} className="bg-gray-100 rounded-lg p-4">
                        <h4 className="font-semibold text-[#001f3f] mb-2">{task.title}</h4>
                        <p className="text-gray-600 mb-2">{task.description}</p>
                        <p className="text-sm text-gray-500">
                          Start Date: {task.start_date} | Deadline: {task.deadline}
                        </p>
                        <p className={`text-sm font-medium mt-2 ${
                          task.status === 'Completed' ? 'text-green-600' :
                          task.status === 'In Progress' ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          Status: {task.status}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'statistics' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-[#001f3f]">Statistics:</h3>
                  <div className="bg-gray-100 rounded-lg p-4 mb-6">
                    <p className="mb-2">
                      <span className="font-medium">Total Tasks:</span> {selectedGroup.statistics.totalTasks}
                    </p>
                    <p className="mb-2">
                      <span className="font-medium">Completed Tasks:</span> {selectedGroup.statistics.completedTasks}
                    </p>
                    <p className="mb-2">
                      <span className="font-medium">In Progress Tasks:</span> {selectedGroup.statistics.inProgressTasks}
                    </p>
                    <p>
                      <span className="font-medium">Not Started Tasks:</span> {selectedGroup.statistics.notStartedTasks}
                    </p>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[#001f3f]">Overall Progress:</h3>
                  <p className="text-2xl font-bold text-[#0074D9] mb-6">{selectedGroup.progress}</p>
                  <h3 className="text-xl font-semibold mb-4 text-[#001f3f]">Task Statistics:</h3>
                  <div className="h-64">
                    <PieChart data={selectedGroup.statistics} />
                  </div>
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
          weight: 'bold',
        },
        color: '#001f3f',
      },
      legend: {
        position: 'bottom',
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default Teacher;

