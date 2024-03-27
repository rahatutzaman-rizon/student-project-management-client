import  { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const Projects = () => {
    const {id}=useParams();
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
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Teams</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {teams.map((team) => (
          <li
            key={team._id}
            className="bg-white rounded-lg shadow-md p-4 hover:bg-gray-100 transition-colors duration-300"
          >
            <h2 className="text-xl font-semibold">Team {team.team}</h2>
            <Link 
              to={`/team${id}/${team._id}`}
              className="inline-block mt-2 bg-teal-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              View Details
            </Link>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;