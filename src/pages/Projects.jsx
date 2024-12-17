import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  Clock, 
  RefreshCw, 
  AlertTriangle,
  Video,
  MapPin
} from 'lucide-react';

// API Service (unchanged)
const fetchTeams = async (projectId) => {
  const response = await fetch(`https://student-project-management-server.vercel.app/${projectId}`, {
    headers: {
      'Cache-Control': 'max-age=3600',
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch project teams');
  }

  return response.json();
};

// Detailed Meeting Schedules 
const meetingSchedules = {
  'Group A': [
    { 
      id: 1, 
      day: 'Monday', 
      time: '10:00 AM', 
      type: 'Sprint Planning', 
      platform: 'Zoom',
      duration: '1 hour',
      facilitator: 'Project Manager'
    },
    { 
      id: 2, 
      day: 'Wednesday', 
      time: '2:00 PM', 
      type: 'Status Update', 
      platform: 'Google Meet',
      duration: '45 minutes',
      facilitator: 'Scrum Master'
    }
  ],
  'Group B': [
    { 
      id: 1, 
      day: 'Tuesday', 
      time: '11:00 AM', 
      type: 'Design Review', 
      platform: 'Microsoft Teams',
      duration: '1.5 hours',
      facilitator: 'Design Lead'
    },
    { 
      id: 2, 
      day: 'Thursday', 
      time: '3:00 PM', 
      type: 'Technical Sync', 
      platform: 'Zoom',
      duration: '1 hour',
      facilitator: 'Tech Lead'
    }
  ]
};

const MeetingScheduleCard = ({ meeting }) => (
  <div 
    className="bg-white rounded-xl shadow-md p-5 transform transition-all hover:scale-105 hover:shadow-lg"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <Calendar className="text-purple-500 w-6 h-6" />
        <h3 className="text-lg font-semibold text-purple-800">
          {meeting.type}
        </h3>
      </div>
      <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
        {meeting.duration}
      </span>
    </div>
    <div className="space-y-2">
      <div className="flex items-center space-x-2 text-gray-600">
        <Clock className="w-4 h-4 text-purple-400" />
        <span>{meeting.day}, {meeting.time}</span>
      </div>
      <div className="flex items-center space-x-2 text-gray-600">
        <Video className="w-4 h-4 text-purple-400" />
        <span>{meeting.platform}</span>
      </div>
      <div className="flex items-center space-x-2 text-gray-600">
        <Users className="w-4 h-4 text-purple-400" />
        <span>Facilitator: {meeting.facilitator}</span>
      </div>
    </div>
  </div>
);

const MeetingSchedulesSection = ({ selectedGroup }) => {
  const schedules = meetingSchedules[`Group ${selectedGroup.team}`] || [];

  return (
    <div className="mt-10 bg-purple-50 rounded-2xl p-8 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-purple-800">
          Group {selectedGroup.team} Meeting Schedule
        </h2>
        <Calendar className="text-purple-500 w-10 h-10" />
      </div>
      
      {schedules.length === 0 ? (
        <div className="text-center text-gray-600">
          No meetings scheduled for this group.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {schedules.map(meeting => (
            <MeetingScheduleCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      )}
    </div>
  );
};

const ProjectTeams = () => {
  const { id } = useParams();
  const [selectedGroup, setSelectedGroup] = useState(null);

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
    retry: 2,
    retryDelay: 1000,
  });

  // (Rest of the existing code remains the same until the return statement)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <marquee 
        className="bg-purple-600 text-white p-3 mb-6 rounded-lg"
        behavior="scroll" 
        direction="left"
      >
        🎉 Welcome to the Project Management Dashboard! Stay connected and collaborate effectively with your team. 🚀
      </marquee>

      <div className="max-w-7xl mx-auto">
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 flex items-center">
            <Users className="mr-4 text-purple-500 w-10 h-10" />
            Project Teams
          </h1>
          <div className="flex items-center space-x-3 text-purple-700">
            <Users className="w-6 h-6 text-purple-500" />
            <span className="text-lg font-semibold">
              Total Groups: {teams.length}
            </span>
          </div>
        </div>

        {teams.length === 0 ? (
          <div className="text-center bg-white rounded-2xl shadow-lg p-12">
            <Users className="mx-auto mb-6 text-purple-400 w-24 h-24" />
            <p className="text-2xl text-purple-600 font-medium">
              No project teams have been created yet
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {teams.map(team => (
                <div 
                  key={team._id} 
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 overflow-hidden"
                >
                  <div className="p-6 relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="bg-purple-50 p-3 rounded-full">
                          <Users className="text-purple-500 w-8 h-8" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-purple-800">
                            Group {team.team}
                          </h3>
                          <p className="text-sm text-gray-500">Project Team</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setSelectedGroup(team)}
                        className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200 transition-colors"
                      >
                        Meetings
                      </button>
                    </div>
                    
                    {/* Team details section - unchanged */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center space-x-3">
                        <Users className="text-purple-400 w-5 h-5" />
                        <p className="text-sm text-gray-600 truncate">
                          Team Members: {team.name}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="text-purple-400 w-5 h-5" />
                        <p className="text-sm text-gray-600">
                          Project Location: Virtual/Hybrid
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="text-purple-400 w-5 h-5" />
                        <p className="text-sm text-gray-600">
                          Project Duration: 3 months
                        </p>
                      </div>
                    </div>

                    <Link
                      to={`/team${id}/${team._id}`}
                      className="group flex items-center justify-between w-full text-purple-600 hover:text-purple-800 transition-colors"
                    >
                      <span className="text-sm font-medium">View Project Details</span>
                      <Users className="w-5 h-5 transform group-hover:scale-110 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* New Meeting Schedules Section */}
            {selectedGroup && (
              <MeetingSchedulesSection selectedGroup={selectedGroup} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectTeams;