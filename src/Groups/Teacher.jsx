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
        const response = await fetch(`http://localhost:5000/${id}`);
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

    axios.put(`http://localhost:5000/taskUpdate/${id}`, newTask)
.then(res =>{
console.log(res)
})
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <div className="md:w-1/4 bg-gradient-to-b from-purple-800 to-pink-800 text-white p-4">
        <h1 className="text-2xl font-bold mb-4">Groups</h1>
        <div className="grid grid-cols-1 gap-4">
          {groups.map((group) => (
            <button
              key={group.id}
              className={`bg-gradient-to-r ${
                selectedGroup?.id === group.id
                  ? 'from-purple-500 to-pink-500'
                  : 'from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500'
              } rounded-lg shadow-md p-4 cursor-pointer text-left`}
              onClick={() => handleGroupClick(group)}
            >
              <h2 className="text-xl font-bold">{group.name}</h2>
              <p>Members: {group.members.length}</p>
              <p>Tasks: {group.tasks.length}</p>
              <p>group: {group.team}</p>

            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="md:w-3/4 p-8">
        {showSidebar && selectedGroup && (
          <div className="bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg shadow-md p-4 h-full flex flex-col">
            {/* Tab Buttons */}
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
                  <p>{selectedGroup.description}</p>

                  <h3 className="text-xl font-bold mt-4 mb-2">Members:</h3>
                  <ul className="list-disc pl-4">
                    {selectedGroup.members.map((member) => (
                      <li key={member.id}>{member.name}</li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'tasks' && (
                <div>
                  <h3 className="text-xl font-bold mb-2">Tasks:</h3>
                  <ul className="list-disc pl-4">
                    {selectedGroup.tasks.map((task) => (
                      <li key={task.id} className="mb-4">
                        <h4 className="font-bold">{task.title}</h4>
                        <p>{task.description}</p>
                        <p>
                          Assigned to:{' '}
                          {selectedGroup.members.find((member) => member.id === task.assignedTo)?.name || 'Unassigned'}
                        </p>
                        <p>Deadline: {task.deadline}</p>
                        <p>Status: {task.status}</p>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-xl font-bold mt-4 mb-2">Add New Task</h3>
                  <div className="mb-4">
                    <label htmlFor="title" className="block font-bold mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={newTask.title}
                      onChange={handleInputChange}
                      className="border border-gray-400 p-2 w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="description" className="block font-bold mb-2">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={newTask.description}
                      onChange={handleInputChange}
                      className="border border-gray-400 p-2 w-full"
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="assignedTo" className="block font-bold mb-2">
                      Assigned To
                    </label>
                    <select
                      id="assignedTo"
                      name="assignedTo"
                      value={newTask.assignedTo}
                      onChange={handleInputChange}
                      className="border border-gray-400 p-2 w-full"
                    >
                      <option value={null}>Select a member</option>
                      {selectedGroup.members.map((member) => (
                        <option key={member.id} value={member.id}>
                          {member.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="deadline" className="block font-bold mb-2">
                      Deadline
                    </label>
                    <input
                      type="date"
                      id="deadline"
                      name="deadline"
                      value={newTask.deadline}
                      onChange={handleInputChange}
                      className="border border-gray-400 p-2 w-full"
                    />
                  </div>
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleAddTask}
                  >
                    Add Task
                  </button>
                </div>
              )}

              {activeTab === 'statistics' && (
                <div>
                  <h3 className="text-xl font-bold mb-2">Statistics:</h3>
                  <ul className="list-disc pl-4">
                    <li>Total Tasks: {selectedGroup.statistics.totalTasks}</li>
                    <li>Completed Tasks: {selectedGroup.statistics.completedTasks}</li>
                    <li>In Progress Tasks: {selectedGroup.statistics.inProgressTasks}</li>
                    <li>Not Started Tasks: {selectedGroup.statistics.notStartedTasks}</li>
                  </ul>

                  <h3 className="text-xl font-bold mt-4 mb-2">Overall Progress:</h3>
                  <p>{selectedGroup.progress}</p>

                  <h3 className="text-xl font-bold mt-4 mb-2">Task Statistics:</h3>
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