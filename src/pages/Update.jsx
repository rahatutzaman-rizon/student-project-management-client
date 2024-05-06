import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';

function Update() {
  const [excelData, setExcelData] = useState(null);
  const [emailList, setEmailList] = useState({});

  const teachersData = [
    {
      id: 1,
      name: 'DR. MUHAMMAD SHAHIN UDDIN',
      designation: 'PROFESSOR',
      email: 'shahin.mbstu@gmail.com',
      image: 'https://i.ibb.co/jbdCMcJ/1.jpg',
    },
    {
      id: 2,
      name: 'DR. SAJJAD WAHEED',
      designation: 'PROFESSOR',
      email: 'sajjad@mbstu.ac.bd',
      image: 'https://i.ibb.co/BwXQmYH/2.jpg',
    },
    {
      id: 3,
      name: 'DR. MONIR MORSHED',
      designation: 'PROFESSOR',
      email: 'monirmorshed.ict@mbstu.ac.bd',
      image: 'https://i.ibb.co/dj6B55y/3.jpg',
    },
    {
      id: 4,
      name: 'MOHAMMAD BADRUL ALAM MIAH',
      designation: 'PROFESSOR',
      email: 'badrul.ict@gmail.com',
      image: 'https://i.ibb.co/Q6y9ZH4/4.jpg',
    },
    {
      id: 5,
      name: 'DR. MST. NARGIS AKTER',
      designation: 'PROFESSOR',
      email: 'nagis_ict@mbstu.ac.bd',
      image: 'https://i.ibb.co/NtrKLbS/5.jpg',
    },
    {
      id: 6,
      name: 'DR. MD. ABIR HOSSAIN',
      designation: 'ASSOCIATE PROFESSOR',
      email: 'abir.hossain@mbstu.ac.bd',
      image: 'https://i.ibb.co/Xjdxx6d/6.jpg',
    },
    {
      id: 7,
      name: 'BIKASH KUMAR PAUL',
      designation: 'ASSISTANT PROFESSOR',
      email: 'bikash@mbstu.ac.bd',
      image: 'https://i.ibb.co/XX9HQsS/7.jpg',
    },
  ];

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setExcelData(jsonData);

      // Group students by teacher's email
      const emailListData = {};
      jsonData.slice(1).forEach((row) => {
        const email = row[4]; // Assuming the teacher's email is in the fifth column (index 4)
        const name = row[0]; // Assuming the student's name is in the first column (index 0)
        const teacher = row[2]; // Assuming the teacher's name is in the third column (index 2)
        const teacherData = teachersData.find((t) => t.email === email);
        if (emailListData[email]) {
          emailListData[email].students.push(name);
        } else {
          emailListData[email] = {
            teacher: teacher,
            students: [name],
            teacherData: teacherData || null,
          };
        }
      });
      setEmailList(emailListData);
    };
    reader.readAsArrayBuffer(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="container mx-auto p-4">
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-400 p-4 rounded-md bg-gradient-to-r from-blue-200 to-pink-200 text-center cursor-pointer"
      >
        <input {...getInputProps()} />
        <p className="text-gray-600 font-semibold">Drag 'n' drop an Excel file here, or click to select one</p>
      </div>
      {excelData && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Excel Data</h2>
          <table className="table-auto w-full border-collapse border-gray-400">
            <thead>
              <tr className="bg-gradient-to-r from-blue-200 to-pink-200">
                {excelData[0].map((cell, index) => (
                  <th key={index} className="px-4 py-2 border font-semibold text-gray-600">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {excelData.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-4 py-2 border text-gray-700">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {Object.keys(emailList).length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Student List by Teacher's Email</h2>
          <ul>
            {Object.entries(emailList).map(([email, { teacher, students, teacherData }]) => (
              <li key={email} className="mb-4 bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-t-lg">
                  <h3 className="text-lg font-semibold mb-2">{teacher}</h3>
                  <p className="text-sm">{email}</p>
                  {teacherData && (
                    <div className="mt-4 flex items-center">
                      <img
                        src={teacherData.image}
                        alt={teacherData.name}
                        className="w-16 h-16 rounded-full mr-4 border-2 border-white"
                      />
                      <div>
                        <p className="text-sm font-semibold">{teacherData.name}</p>
                        <p className="text-xs">{teacherData.designation}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4 flex">
                  <p className="text-gray-700 font-semibold mb-2">Student List:</p>
                  <ul className="ml-4">
                    {students.map((name) => (
                      <li key={name} className="text-gray-600">
                        {name}
                      </li>
                    ))}
                  </ul>
                  
                  
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      </div>

);
}
export default Update;