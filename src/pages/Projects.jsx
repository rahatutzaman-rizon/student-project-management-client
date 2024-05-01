import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const Projects = () => {
  const { id } = useParams();
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/${id}`);
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error('Error fetching team data:', error);
      }
    };
    fetchTeamData();
  }, [id]);

  return (
   
    <div className="bg-white min-h-screen flex items-center justify-center">
  <div className="bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 rounded-3xl shadow-2xl p-8 max-w-5xl">
    <h1 className="text-4xl font-extrabold mb-8 text-center text-white drop-shadow-lg tracking-wide">
      Total Groups: {teams.length}
    </h1>
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {teams.map((team) => (
        <li
          key={team._id}
          className="bg-white rounded-3xl shadow-2xl p-6 hover:scale-105 transition-transform duration-300 relative"
        >
          <div className="mb-6">
            <h2 className="text-3xl text-center font-bold text-teal-600 mb-2">
              Group {team.team}
            </h2>
            <h3 className=" bg-lime-600 text-sm text-center font-semibold text-white mb-2 rounded">
            {team.work}
            </h3>
            <p className="text-sky-500 min-h-20"> {team.name}</p>
          </div>
          <Link
            to={`/team${id}/${team._id}`}
            className="inline-block bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-full hover:scale-105 transition-transform duration-300 shadow-md"
          >
            View Details
          </Link>
        </li>
      ))}
    </ul>
  </div>
</div>
  );
};

export default Projects;