import React, { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import { 
  FileUp, 
  Download, 
  Printer, 
  UserPlus, 
  Save, 
  X, 
  Check 
} from 'lucide-react';

function Update() {
  const [excelData, setExcelData] = useState(null);
  const [emailList, setEmailList] = useState({});
  const [teacherList, setTeacherList] = useState([]);
  const [selectedTeachers, setSelectedTeachers] = useState({});
  const [unassignedStudents, setUnassignedStudents] = useState([]);
  const componentRef = useRef(null);

  // Predefined teachers with more details
  const predefinedTeachers = [
    { 
      id: 1, 
      name: 'Dr. Muhammad Shahin Uddin', 
      designation: 'Professor', 
      email: 'shahin.mbstu@gmail.com', 
      image: 'https://i.ibb.co/jbdCMcJ/1.jpg',
      expertise: 'Machine Learning',
      maxStudents: 6
    },
    { 
      id: 2, 
      name: 'Dr. Sajjad Waheed', 
      designation: 'Professor', 
      email: 'sajjad@mbstu.ac.bd', 
      image: 'https://i.ibb.co/BwXQmYH/2.jpg',
      expertise: 'Network Security',
      maxStudents: 5
    },
    { 
      id: 3, 
      name: 'Dr. Monir Morshed', 
      designation: 'Professor', 
      email: 'monirmorshed.ict@mbstu.ac.bd', 
      image: 'https://i.ibb.co/dj6B55y/3.jpg',
      expertise: 'Cloud Computing',
      maxStudents: 4
    },
    { 
      id: 4, 
      name: 'Mohammad Badrul Alam Miah', 
      designation: 'Professor', 
      email: 'badrul.ict@gmail.com', 
      image: 'https://i.ibb.co/Q6y9ZH4/4.jpg',
      expertise: 'Artificial Intelligence',
      maxStudents: 5
    }
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
      
      // Prepare unassigned students
      const students = jsonData.slice(1).map(row => ({
        name: row[0],
        projectTopic: row[1],
        skillSet: row[3]
      }));
      
      setUnassignedStudents(students);
    };
    reader.readAsArrayBuffer(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ 
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    }
  });

  const assignStudent = (student, teacherId) => {
    const teacher = predefinedTeachers.find(t => t.id === teacherId);
    
    // Create a copy of selectedTeachers
    const updatedSelectedTeachers = {...selectedTeachers};
    
    if (!updatedSelectedTeachers[teacherId]) {
      updatedSelectedTeachers[teacherId] = { students: [], teacherInfo: teacher };
    }
    
    // Check if teacher hasn't reached max student limit
    if (updatedSelectedTeachers[teacherId].students.length < teacher.maxStudents) {
      updatedSelectedTeachers[teacherId].students.push(student);
      
      // Remove student from unassigned list
      const updatedUnassignedStudents = unassignedStudents.filter(
        s => s.name !== student.name
      );
      
      setSelectedTeachers(updatedSelectedTeachers);
      setUnassignedStudents(updatedUnassignedStudents);
    } else {
      alert(`${teacher.name} has reached the maximum student limit.`);
    }
  };

  const removeStudentAssignment = (studentName, teacherId) => {
    const updatedSelectedTeachers = {...selectedTeachers};
    
    // Find and remove the student
    const removedStudent = updatedSelectedTeachers[teacherId].students.find(
      s => s.name === studentName
    );
    
    updatedSelectedTeachers[teacherId].students = updatedSelectedTeachers[teacherId].students.filter(
      s => s.name !== studentName
    );
    
    // Add student back to unassigned list
    setUnassignedStudents([...unassignedStudents, removedStudent]);
    setSelectedTeachers(updatedSelectedTeachers);
  };

  const handleDownload = () => {
    // Create a new workbook with assigned students
    const assignmentData = Object.entries(selectedTeachers).flatMap(
      ([teacherId, { students, teacherInfo }]) => 
        students.map(student => ({
          'Teacher Name': teacherInfo.name,
          'Teacher Email': teacherInfo.email,
          'Student Name': student.name,
          'Project Topic': student.projectTopic,
          'Skill Set': student.skillSet
        }))
    );

    const worksheet = XLSX.utils.json_to_sheet(assignmentData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Student Assignments');
    XLSX.writeFile(workbook, 'student_assignments.xlsx');
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Student Project Management System
        </h1>

        {/* File Upload Section */}
        <div 
          {...getRootProps()}
          className="border-2 border-dashed border-blue-400 p-6 rounded-lg text-center 
                     hover:bg-blue-50 transition duration-300 cursor-pointer mb-8"
        >
          <input {...getInputProps()} />
          <div className="flex justify-center mb-4">
            <FileUp size={48} className="text-blue-500" />
          </div>
          <p className="text-gray-600 font-semibold">
            Drag & drop Excel file or click to select
          </p>
          <p className="text-sm text-gray-500 mt-2">
            (.xls or .xlsx files supported)
          </p>
        </div>

        {/* Unassigned Students Section */}
        {unassignedStudents.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">
              Unassigned Students
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {unassignedStudents.map((student, index) => (
                <div 
                  key={index} 
                  className="bg-white border rounded-lg p-4 shadow hover:shadow-md transition"
                >
                  <h3 className="font-semibold text-lg mb-2">{student.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Project:</strong> {student.projectTopic}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    <strong>Skills:</strong> {student.skillSet}
                  </p>
                  <div className="flex space-x-2">
                    {predefinedTeachers.map(teacher => (
                      <button 
                        key={teacher.id} 
                        onClick={() => assignStudent(student, teacher.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded-full text-xs 
                                   hover:bg-green-600 transition flex items-center"
                      >
                        <UserPlus size={12} className="mr-1" /> {teacher.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Assigned Students Section */}
        {Object.keys(selectedTeachers).length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-700">
              Student Assignments
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(selectedTeachers).map(([teacherId, { students, teacherInfo }]) => (
                <div 
                  key={teacherId} 
                  className="bg-gradient-to-br from-blue-100 to-purple-100 
                             rounded-lg overflow-hidden shadow-lg"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-white">
                    <div className="flex items-center">
                      <img 
                        src={teacherInfo.image} 
                        alt={teacherInfo.name} 
                        className="w-16 h-16 rounded-full mr-4 border-2 border-white"
                      />
                      <div>
                        <h3 className="text-lg font-bold">{teacherInfo.name}</h3>
                        <p className="text-sm">{teacherInfo.designation}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-gray-600">
                        {students.length} / {teacherInfo.maxStudents} Students
                      </span>
                      <span className="text-sm text-gray-500">
                        {teacherInfo.expertise}
                      </span>
                    </div>
                    {students.map((student, index) => (
                      <div 
                        key={index} 
                        className="bg-white rounded-lg p-3 mb-2 shadow flex justify-between items-center"
                      >
                        <div>
                          <h4 className="font-semibold">{student.name}</h4>
                          <p className="text-xs text-gray-500">{student.projectTopic}</p>
                        </div>
                        <button 
                          onClick={() => removeStudentAssignment(student.name, teacherId)}
                          className="text-red-500 hover:bg-red-50 rounded-full p-1"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex justify-end space-x-4">
          <button 
            onClick={handleDownload}
            className="flex items-center bg-green-500 text-white px-4 py-2 
                       rounded-lg hover:bg-green-600 transition"
          >
            <Download size={16} className="mr-2" /> Download Assignments
          </button>
        </div>
      </div>
    </div>
  );
}

export default Update;