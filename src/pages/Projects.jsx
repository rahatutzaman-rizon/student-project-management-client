import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  Users, 
  FolderKanban, 
  Briefcase, 
  ChevronRight, 
  AlertCircle, 
  Loader2 
} from 'lucide-react';

const Projects = () => {
  const { id } = useParams();
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTeamData = useCallback(async () => {
    setIsLoading(true);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(`https://student-project-management-server.vercel.app/${id}`, {
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setTeams(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'An error occurred');
      setTeams([]);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchTeamData();
  }, [fetchTeamData]);

  const teamList = useMemo(() => {
    return teams.map((team) => (
      <div 
        key={team._id} 
        className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-2 overflow-hidden"
      >
        <div className="p-5">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-3">
              <FolderKanban className="text-blue-500 w-6 h-6" />
              <h3 className="text-lg font-semibold text-gray-800">
                Group {team.team}
              </h3>
            </div>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {team.work}
            </span>
          </div>
          
          <div className="flex items-center space-x-3 mb-4">
            <Users className="text-gray-400 w-5 h-5" />
            <p className="text-sm text-gray-600 truncate">
              {team.name}
            </p>
          </div>

          <Link
            to={`/team${id}/${team._id}`}
            className="group flex items-center justify-between w-full text-blue-600 hover:text-blue-800 transition-colors"
          >
            <span className="text-sm font-medium">View Details</span>
            <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    ));
  }, [teams, id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <Loader2 className="animate-spin text-blue-500 w-12 h-12" />
          <p className="mt-4 text-gray-600">Loading teams...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center bg-white p-8 rounded-xl shadow-md">
          <AlertCircle className="mx-auto mb-4 text-red-500 w-12 h-12" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Unable to Load Teams
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchTeamData} 
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
            <Briefcase className="mr-3 text-blue-500 w-8 h-8" />
            Project Teams
          </h1>
          <div className="flex items-center space-x-2 text-gray-600">
            <Users className="w-5 h-5" />
            <span className="font-medium">Total Groups: {teams.length}</span>
          </div>
        </div>

        {teams.length === 0 ? (
          <div className="text-center">
            <FolderKanban className="mx-auto mb-4 text-gray-400 w-16 h-16" />
            <p className="text-xl text-gray-600">No teams found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {teamList}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;