import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Project = () => {
  const [teachers, setTeachers] = useState([]);

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
      },
      {
        "id": 2,
        "name": "DR. SAJJAD WAHEED",
        "designation": "PROFESSOR",
        "department": "ICT",
        "email":"sajjad@mbstu.ac.bd",
        "image": "https://i.ibb.co/BwXQmYH/2.jpg",
      },
      {
        "id": 3,
        "name": "DR. MONIR MORSHED",
        "designation": "PROFESSOR",
        "department": "ICT",
        "email": "monirmorshed.ict@mbstu.ac.bd",
        "image": "https://i.ibb.co/dj6B55y/3.jpg",
      },
      {
        "id": 4,
        "name": "MOHAMMAD BADRUL ALAM MIAH",
        "designation": "PROFESSOR",
        "department": "ICT",
        "email": "badrul.ict@gmail.com",
        "image": "https://i.ibb.co/Q6y9ZH4/4.jpg",
      },
      {
        "id": 5,
        "name": "DR. MST. NARGIS AKTER",
        "designation": "PROFESSOR",
        "department": "ICT",
        "email": "nagis_ict@mbstu.ac.bd", 
        "image": "https://i.ibb.co/NtrKLbS/5.jpg",
      },
      {
        "id": 6,
        "name": "DR. MD. ABIR HOSSAIN",
        "designation": "ASSOCIATE PROFESSOR",
        "department": "ICT",
        "email":"abir.hossain@mbstu.ac.bd",
        "image": "https://i.ibb.co/Xjdxx6d/6.jpg",
      },
      {
        "id": 7,
        "name": "BIKASH KUMAR PAUL",
        "designation": "ASSISTANT PROFESSOR",
        "department": "ICT",
        "email":"bikash@mbstu.ac.bd",
        "image": "https://i.ibb.co/XX9HQsS/7.jpg",
      }
    ];

    setTeachers(teachersData);
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Distinguished</span> Faculty
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            Dedicated professionals shaping the future of technology and innovation
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {teachers.map((teacher) => (
            <div 
              key={teacher.id}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
                </div>

                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {teacher.name}
                  </h3>
                  <br />

                  <div className="text-sm text-gray-600 mb-4">
                    <p className="font-medium text-gray-800">{teacher.designation}</p>
                    <p className="text-black-500 text-lg">{teacher.department}</p>
                  </div>

                  <div className="mb-4 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span className="text-sm text-gray-600 truncate max-w-[200px]">
                      demo@email.com
                    </span>
                  </div>

                  <Link
                    to={`/project/${teacher.id}`}
                    className="w-full inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors duration-300 text-sm"
                  >
                    View Profile
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