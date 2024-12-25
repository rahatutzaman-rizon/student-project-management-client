import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { 
  Loader2,
  Users,
  BookOpen,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Award,
  Calendar
} from 'lucide-react';

const COLORS = ['#3069a1', '#0074D9', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const LoadingCard = () => (
  <div className="bg-white p-6 rounded-lg shadow animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-8 bg-gray-200 rounded w-1/2"></div>
  </div>
);

const Dashboard = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedView, setSelectedView] = useState('overview');
  const [loadingStates, setLoadingStates] = useState(Array(7).fill(true));

  useEffect(() => {
    const fetchData = async (index) => {
      try {
        const response = await fetch(`https://student-project-management-server.vercel.app/${index + 1}`);
        const data = await response.json();
        setLoadingStates(prev => {
          const newStates = [...prev];
          newStates[index] = false;
          return newStates;
        });
        return data;
      } catch (err) {
        setError(`Failed to fetch data from endpoint ${index + 1}`);
        return [];
      }
    };

    const fetchAllData = async () => {
      const promises = Array.from({ length: 7 }, (_, i) => fetchData(i));
      const results = await Promise.all(promises);
      const flattenedData = results.flat().filter(Boolean);
      setProjectsData(flattenedData);
      setLoading(false);
    };

    fetchAllData();
  }, []);

  const calculateStats = () => {
    const stats = {
      totalProjects: projectsData.length,
      completedTasks: 0,
      inProgressTasks: 0,
      notStartedTasks: 0,
      softwareProjects: 0,
      hardwareProjects: 0,
      thesisProjects: 0,
      totalStudents: 0,
      upcomingDeadlines: []
    };

    projectsData.forEach(project => {
      if (project.work === 'Software') stats.softwareProjects++;
      if (project.work === 'Hardware') stats.hardwareProjects++;
      if (project.work === 'Thesis') stats.thesisProjects++;
      
      stats.totalStudents += project.members?.length || 0;

      project.tasks?.forEach(task => {
        if (task.status === 'Completed') stats.completedTasks++;
        if (task.status === 'In Progress') stats.inProgressTasks++;
        if (task.status === 'Not Started') stats.notStartedTasks++;

        const deadline = new Date(task.deadline);
        const today = new Date();
        if (deadline > today && task.status !== 'Completed') {
          stats.upcomingDeadlines.push({
            projectName: project.name,
            taskName: task.title,
            deadline: task.deadline
          });
        }
      });
    });

    stats.upcomingDeadlines.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    return stats;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <LoadingCard key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 p-6 rounded-lg shadow text-red-500">
          <AlertCircle className="w-8 h-8 mb-2" />
          <h3 className="text-lg font-semibold">Error Loading Dashboard</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const stats = calculateStats();

  const projectTypeData = [
    { name: 'Software', value: stats.softwareProjects },
    { name: 'Hardware', value: stats.hardwareProjects },
    { name: 'Thesis', value: stats.thesisProjects }
  ];

  const taskStatusData = [
    { name: 'Completed', value: stats.completedTasks },
    { name: 'In Progress', value: stats.inProgressTasks },
    { name: 'Not Started', value: stats.notStartedTasks }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3069a1] to-[#0074D9] mb-[-64px]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-white">
          <h1 className="text-4xl font-bold">Project Management Dashboard</h1>
          <p className="text-gray-200 mt-2">Real-time overview of project status and metrics</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8 flex space-x-4">
          {['overview'].map((view) => (
            <button
              key={view}
              onClick={() => setSelectedView(view)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedView === view
                  ? 'bg-white text-[#3069a1]'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Projects</p>
                  <p className="text-3xl font-bold text-[#3069a1]">{stats.totalProjects}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <BookOpen className="w-6 h-6 text-[#3069a1]" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Students</p>
                  <p className="text-3xl font-bold text-green-600">{stats.totalStudents}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Completed Tasks</p>
                  <p className="text-3xl font-bold text-purple-600">{stats.completedTasks}</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">In Progress</p>
                  <p className="text-3xl font-bold text-orange-600">{stats.inProgressTasks}</p>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Project Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={projectTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {projectTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Task Progress</h2>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={taskStatusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" fill="#3069a1" stroke="#0074D9" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-[#3069a1]" />
              Upcoming Deadlines
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stats.upcomingDeadlines.slice(0, 5).map((deadline, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {deadline.projectName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {deadline.taskName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(deadline.deadline).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Upcoming
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Projects Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                <Award className="w-6 h-6 mr-2 text-[#3069a1]" />
                Recent Projects
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Members</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                  {projectsData.map((project) => (
                      <tr key={project._id} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{project.name}</div>
                              <div className="text-sm text-gray-500">ID: {project._id.slice(-4)}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{project.teacher}</div>
                          <div className="text-sm text-gray-500">{project.designation}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            project.work === 'Software' ? 'bg-blue-100 text-blue-800' :
                            project.work === 'Hardware' ? 'bg-green-100 text-green-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {project.work}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex -space-x-2 overflow-hidden">
                            {project.members?.map((member, index) => (
                              <div
                                key={member.it}
                                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 border-2 border-white"
                                title={member.name}
                              >
                                <span className="text-xs font-medium text-gray-600">
                                  {member.name.charAt(0)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            project.tasks?.[project.tasks.length - 1]?.status === 'Completed' 
                              ? 'bg-green-100 text-green-800'
                              : project.tasks?.[project.tasks.length - 1]?.status === 'In Progress'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {project.tasks?.[project.tasks.length - 1]?.status || 'Not Started'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-[#3069a1]" />
                Task Completion Trend
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={projectsData.map(project => ({
                  name: project.name.slice(0, 15) + '...',
                  completed: project.tasks?.filter(task => task.status === 'Completed').length || 0,
                  total: project.tasks?.length || 0
                }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="completed" stroke="#3069a1" name="Completed Tasks" />
                  <Line type="monotone" dataKey="total" stroke="#0074D9" name="Total Tasks" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Project Progress Summary */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Project Progress</h2>
              {projectsData.slice(0, 5).map((project) => {
                const completedTasks = project.tasks?.filter(task => task.status === 'Completed').length || 0;
                const totalTasks = project.tasks?.length || 0;
                const progress = (completedTasks / totalTasks) * 100;

                return (
                  <div key={project._id} className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{project.name.slice(0, 30)}...</span>
                      <span className="text-sm font-medium text-gray-700">{progress.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-[#3069a1] h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-white/80 text-sm">
          <p>© 2024 Project Management Dashboard. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;