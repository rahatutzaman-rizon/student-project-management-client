import { Card } from 'flowbite-react';
import { useState, useEffect } from 'react';
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
    ];


    setTeachers(teachersData);
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Teachers Informtaion</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
        {teachers.map((teacher) => (
          <li key={teacher.id} className="bg-white rounded-lg shadow-md p-2">
            <Card imgAlt={teacher.name}>
              <div className="relative h-56">
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
              <h5 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 ">
  {teacher.name}
</h5>
<p className="text-lg font-semibold text-sky-600 mb-1">{teacher.designation}</p>
<h6 className="text-blue-700 ">
  <span className="font-bold text-teal-600">Email:</span> {teacher.email}
</h6>
              <Link
                to={`/project/${teacher.id}`}
                className="mt-4 inline-block bg-gradient-to-r from-sky-500 via-blue-500 to-teal-400 text-white font-bold py-2 px-4 rounded-lg hover:bg-gradient-to-l hover:from-red-500 hover:via-pink-500 hover:to-purple-500 transition-colors duration-300"
              >
                Show More Details
              </Link>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Project;