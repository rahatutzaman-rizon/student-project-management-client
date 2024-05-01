import { Card } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Groups = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    // JSON data
    const teachersData = [
      {
        "id": 1,
        "name": "DR. MUHAMMAD SHAHIN UDDIN",
        "designation": "PROFESSOR",
        "email": "shahin.mbstu@gmail.com",
        "image": "https://i.ibb.co/jbdCMcJ/1.jpg",
      },
      {
        "id": 2,
        "name": "DR. SAJJAD WAHEED",
        "designation": "PROFESSOR",
        "email":"sajjad@mbstu.ac.bd",
        "image": "https://i.ibb.co/BwXQmYH/2.jpg",
      },
      {
        "id": 3,
        "name": "DR. MONIR MORSHED",
        "designation": "PROFESSOR",
        "email": "monirmorshed.ict@mbstu.ac.bd",
        "image": "https://i.ibb.co/dj6B55y/3.jpg",
        
  
      },
    
      {
        "id": 4,
        "name": "MOHAMMAD BADRUL ALAM MIAH",
        "designation": "PROFESSOR",
        "email": "badrul.ict@gmail.com",
        "image": "https://i.ibb.co/Q6y9ZH4/4.jpg",

      },
      {
        "id": 5,
        "name": "DR. MST. NARGIS AKTER",
        "designation": "PROFESSOR",
        "email": "nagis_ict@mbstu.ac.bd", 
        "image": "https://i.ibb.co/NtrKLbS/5.jpg",
        
      }
      ,{
        "id": 6,
        "name": "DR. MD. ABIR HOSSAIN",
        "designation": "ASSOCIATE PROFESSOR",
        "email":"abir.hossain@mbstu.ac.bd",
        
        "image": "https://i.ibb.co/Xjdxx6d/6.jpg",

      }
      ,
      {
        "id": 7,
        "name": "BIKASH KUMAR PAUL",
        "designation": "ASSISTANT PROFESSOR",
        "email":"bikash@mbstu.ac.bd",
          
        "image": "https://i.ibb.co/XX9HQsS/7.jpg",

      }
      // ... rest of the data
    ];
    setTeachers(teachersData);
  }, []);

  return (
    <div className="container mx-auto py-8 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <h1 className="text-3xl font-bold mb-4 text-center text-white">Teachers Information</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {teachers.map((teacher) => (
          <li key={teacher.id} className="bg-white rounded-lg shadow-md p-4">
            <Card imgAlt={teacher.name}>
              <div className="relative h-48">
                <img src={teacher.image} alt={teacher.name} className="object-cover w-full h-full rounded-lg" />
              </div>
              <h5 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mt-4">
                {teacher.name}
              </h5>
              <p className="text-lg font-semibold text-yellow-600 mb-1">{teacher.designation}</p>
              <h6 className="text-blue-700">
                <span className="font-bold text-teal-600">Email:</span> {teacher.email}
              </h6>
              <Link
                  to={`/teacher/${teacher.id}`}
                  className=" px-2 py-2 bg-teal-400 text-white rounded-md hover:bg-indigo-300 transition-colors duration-300"
                >
                  View Details
                </Link>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Groups;