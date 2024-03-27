import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Groups = () => {
  const [teachers, setTeachers] = useState([
    { id: 1, name: 'John Doe', subject: 'Mathematics' },
    { id: 2, name: 'Jane Smith', subject: 'English' },
    { id: 3, name: 'Michael Johnson', subject: 'Science' },
    { id: 4, name: 'Emily Williams', subject: 'History' },
  ]);

  const handleClick = (id) => {
    // Handle button click logic for the teacher with the given id
    console.log(`Button clicked for teacher with id ${id}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
          Teachers
        </h2>
        <ul>
          {teachers.map((teacher) => (
            <li key={teacher.id} className="mb-4 last:mb-0">
              <div className="bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg p-8 text-white shadow-md">
                <h3 className="text-xl  mb-4 font-semibold">{teacher.name}</h3>
                
                <Link
                  to={`/teacher/${teacher.id}`}
                  className=" px-2 py-2 bg-white text-indigo-500 rounded-md hover:bg-indigo-100 transition-colors duration-300"
                >
                  View Details
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Groups;