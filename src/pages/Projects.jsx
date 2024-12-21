import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Users, Mail, Briefcase, School, AlertTriangle, ChevronRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

const fetchTeams = async (projectId) => {
  const response = await fetch(`https://student-project-management-server.vercel.app/${projectId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch project teams');
  }
  return response.json();
};

// ProjectTeamCard component remains the same
const ProjectTeamCard = ({ team, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 mt-12"
  >
    <div className="p-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xl font-bold text-[#001f3f] mb-1">
            Group {team.team}
          </h3>
          <p className="text-sm text-[#0074D9]">ID: {team._id.slice(-6)}</p>
        </div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="px-2 py-1 bg-[#001f3f] text-white rounded-full text-xs font-medium"
        >
          {team.work}
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        <div className="bg-[#001f3f]/10 p-2 rounded-md">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-[#0074D9]" />
            <h4 className="font-bold text-sm text-[#001f3f] line-clamp-1">
              {team.name}
            </h4>
          </div>
        </div>

        <div className="space-y-2 bg-white/50 p-2 rounded-md">
          <div className="flex items-center gap-2">
            <School className="h-4 w-4 text-[#0074D9]" />
            <span className="text-sm font-semibold text-[#001f3f]">
              {team.teacher}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-[#0074D9]" />
            <span className="text-sm text-[#001f3f]">
              {team.email}
            </span>
          </div>
        </div>

        <div className="bg-[#001f3f]/10 p-2 rounded-md">
          <h4 className="font-bold text-sm text-[#001f3f] flex items-center gap-2 mb-2">
            <Users className="h-4 w-4 text-[#0074D9]" />
            Team Members
          </h4>
          <div className="space-y-1">
            {team.members?.map((member) => (
              <div key={member.it} className="text-xs text-[#001f3f] ml-4 flex items-center gap-1">
                <div className="w-1 h-1 bg-[#0074D9] rounded-full"></div>
                <span>{member.name}</span>
                <span className="text-[#0074D9]">({member.it})</span>
              </div>
            ))}
          </div>
        </div>

        <Link to={`/team${team.group}/${team._id}`} className="block">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-[#001f3f] to-[#0074D9] text-white py-2 rounded-md text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
          >
            View Details
            <ChevronRight className="h-4 w-4" />
          </motion.button>
        </Link>
      </motion.div>
    </div>
  </motion.div>
);

const ProjectTeams = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Check for authentication on component mount
  useEffect(() => {
    const authToken = Cookies.get('authToken');
    if (!authToken) {
      navigate('/project');
    }
  }, [navigate]);

  const { 
    data: teams = [], 
    isLoading, 
    isError, 
    error,
    refetch 
  } = useQuery({
    queryKey: ['teams', id],
    queryFn: () => fetchTeams(id),
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });

  // Add authentication check to loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#001f3f] to-[#0074D9] flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 border-4 border-white border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (isError) {
    // Check authentication before showing error
    const authToken = Cookies.get('authToken');
    if (!authToken) {
      navigate('/project');
      return null;
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#001f3f] to-[#0074D9] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <AlertTriangle className="mx-auto h-20 w-20 text-white" />
          <p className="text-2xl text-white">Error: {error.message}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // Check authentication before refetching
              const authToken = Cookies.get('authToken');
              if (!authToken) {
                navigate('/project');
                return;
              }
              refetch();
            }}
            className="bg-white text-[#001f3f] px-8 py-3 rounded-xl text-xl font-bold hover:bg-opacity-90 transition-all"
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // Final authentication check before rendering content
  const authToken = Cookies.get('authToken');
  if (!authToken) {
    navigate('/project');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001f3f] to-[#0074D9] mb-[-64px]">
      <Marquee 
        gradient={false} 
        speed={50} 
        className="bg-white/10 backdrop-blur-sm py-2 border-b border-white/20 mt-12"
      >
        <div className="flex space-x-12 gap-2">
          {teams.map((team) => (
            <div key={team._id} className="flex items-center gap-2">
              <span className="text-sky-300 font-bold text-xl">Group {team.team}</span>
              <br />
              <span className="text-sky-100 text-xl">{team.name}</span>
            </div>
          ))}
        </div>
      </Marquee>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3 mb-2">
                <Briefcase className="h-8 w-8" />
                Project Teams
              </h1>
              <p className="text-lg text-white/80">
                Showcasing {teams.length} Innovative Projects
              </p>
            </div>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold"
            >
              {teams.length} Active Teams
            </motion.div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {teams.map((team, index) => (
            <ProjectTeamCard key={team._id} team={team} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectTeams;