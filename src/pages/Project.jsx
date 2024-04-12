import  { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

const Project= () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    // JSON data
    const teachersData = [
      {
        "id": 1,
        "name": "John Doe",
        "subject": "Mathematics"
      },
      {
        "id": 2,
        "name": "Jane Smith",
        "subject": "English Literature"
      },
      {
        "id": 3,
        "name": "Michael Johnson",
        "subject": "Physics"
      },
    
      {
        "id": 4,
        "name": "Emily Davis",
        "subject": "History"
      },
      {
        "id": 5,
        "name": "ronneru Davis",
        "subject": "History"
      }
      ,{
        "id": 6,
        "name": "deshli Davis",
        "subject": "History"
      },{
        "id": 7,
        "name": "kana Davis",
        "subject": "History"
      }
    ];

    setTeachers(teachersData);
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Teachers</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {teachers.map(teacher => (
          <li key={teacher.id} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold">{teacher.name}</h2>
            <p className="text-gray-600">ID: {teacher.id}</p>
            <Link
              to={`/project/${teacher.id}`}
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

export default Project;