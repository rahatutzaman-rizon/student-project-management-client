import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, Mail, User } from 'lucide-react';

const Project = () => {
  const [teachers, setTeachers] = useState([]);
  const [hoveredTeacher, setHoveredTeacher] = useState(null);

  useEffect(() => {
    // JSON data
    const teachersData = [
      {
        "id": 1,
        "name": "DR. MUHAMMAD SHAHIN UDDIN",
        "designation": "PROFESSOR",
        "department": "ICT",
        "email": "shahin.mbstu@gmail.com",
        "image": "https://i.ibb.co/jbdCMcJ/1.jpg",
        "expertise": ["Machine Learning", "Computer Networks", "Data Science"]
      },
      {
        "id": 2,
        "name": "DR. SAJJAD WAHEED",
        "designation": "PROFESSOR",
        "department": "ICT",
        "email":"sajjad@mbstu.ac.bd",
        "image": "https://i.ibb.co/BwXQmYH/2.jpg",
        "expertise": ["Artificial Intelligence", "Software Engineering", "Cybersecurity"]
      },
      {
        "id": 3,
        "name": "DR. MONIR MORSHED",
        "designation": "PROFESSOR",
        "department": "ICT",
        "email": "monirmorshed.ict@mbstu.ac.bd",
        "image": "https://i.ibb.co/dj6B55y/3.jpg",
        "expertise": ["Cloud Computing", "Big Data", "Network Security"]
      },
      {
        "id": 4,
        "name": "MOHAMMAD BADRUL ALAM MIAH",
        "designation": "PROFESSOR",
        "department": "ICT",
        "email": "badrul.ict@gmail.com",
        "image": "https://i.ibb.co/Q6y9ZH4/4.jpg",
        "expertise": ["Software Development", "Blockchain", "IoT"]
      },
      {
        "id": 5,
        "name": "DR. MST. NARGIS AKTER",
        "designation": "PROFESSOR",
        "department": "ICT",
        "email": "nagis_ict@mbstu.ac.bd", 
        "image": "https://i.ibb.co/NtrKLbS/5.jpg",
        "expertise": ["Data Mining", "Machine Learning", "AI Ethics"]
      },
      {
        "id": 6,
        "name": "DR. MD. ABIR HOSSAIN",
        "designation": "ASSOCIATE PROFESSOR",
        "department": "ICT",
        "email":"abir.hossain@mbstu.ac.bd",
        "image": "https://i.ibb.co/Xjdxx6d/6.jpg",
        "expertise": ["Computer Vision", "Deep Learning", "Image Processing"]
      },
      {
        "id": 7,
        "name": "BIKASH KUMAR PAUL",
        "designation": "ASSISTANT PROFESSOR",
        "department": "ICT",
        "email":"bikash@mbstu.ac.bd",
        "image": "https://i.ibb.co/XX9HQsS/7.jpg",
        "expertise": ["Web Technologies", "Mobile App Development", "UX Design"]
      }
    ];

    setTeachers(teachersData);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Faculty <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Experts</span>
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:text-2xl md:mt-5">
            Meet our distinguished professors who are leaders in technology and innovation
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {teachers.map((teacher) => (
            <div 
              key={teacher.id}
              className="relative transform transition-all duration-300 hover:scale-105"
              onMouseEnter={() => setHoveredTeacher(teacher.id)}
              onMouseLeave={() => setHoveredTeacher(null)}
            >
              <div className="bg-white shadow-xl rounded-2xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">
                    {teacher.name}
                  </h3>

                  <div className="flex items-center text-gray-600 mb-2">
                    <Award className="w-5 h-5 mr-2 text-purple-600" />
                    <span className="text-sm font-medium">{teacher.designation}</span>
                  </div>

                  <div className="flex items-center text-gray-600 mb-4">
                    <Mail className="w-5 h-5 mr-2 text-indigo-600" />
                    <span className="text-sm truncate">{teacher.email}</span>
                  </div>

                  {hoveredTeacher === teacher.id && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Expertise:</h4>
                      <div className="flex flex-wrap gap-2">
                        {teacher.expertise.map((skill) => (
                          <span 
                            key={skill} 
                            className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <Link
                    to={`/project/${teacher.id}`}
                    className="mt-4 w-full block text-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors duration-300"
                  >
                    View Full Profile
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;