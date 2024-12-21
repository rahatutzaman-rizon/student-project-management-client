export const fetchTeachers = async () => {
    // In a real application, this would be an API call
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
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return teachersData;
  };
  
  