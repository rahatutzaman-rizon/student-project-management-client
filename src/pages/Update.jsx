import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import { FileUp, Download, X } from 'lucide-react';

const StudentProjectManager = () => {
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState({});

  const teachers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      designation: "Professor",
      email: "sarah.johnson@university.edu",
      maxStudents: 4,
      expertise: "AI & Machine Learning",
      image: "/api/placeholder/64/64"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      designation: "Associate Professor",
      email: "m.chen@university.edu",
      maxStudents: 3,
      expertise: "Web Development",
      image: "/api/placeholder/64/64"
    }
  ];

  const onDrop = (files) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const parsedData = XLSX.utils.sheet_to_json(firstSheet);
      setStudents(parsedData);
    };
    reader.readAsArrayBuffer(files[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    },
    onDrop
  });

  const assignStudent = (student, teacherId) => {
    setAssignments(prev => ({
      ...prev,
      [teacherId]: [...(prev[teacherId] || []), student]
    }));
    setStudents(prev => prev.filter(s => s.id !== student.id));
  };

  const unassignStudent = (student, teacherId) => {
    setAssignments(prev => ({
      ...prev,
      [teacherId]: prev[teacherId].filter(s => s.id !== student.id)
    }));
    setStudents(prev => [...prev, student]);
  };

  const downloadAssignments = () => {
    const data = Object.entries(assignments).flatMap(([teacherId, students]) => {
      const teacher = teachers.find(t => t.id === parseInt(teacherId));
      return students.map(student => ({
        'Teacher': teacher.name,
        'Student': student.name,
        'Project': student.project,
        'Email': student.email
      }));
    });

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Assignments');
    XLSX.writeFile(wb, 'project_assignments.xlsx');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          Student Project Assignment System
        </h1>

        <div {...getRootProps()} className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center mb-8 cursor-pointer hover:bg-blue-50 transition">
          <input {...getInputProps()} />
          <FileUp className="mx-auto h-12 w-12 text-blue-500 mb-4" />
          <p className="text-gray-600">Drop Excel file here or click to upload</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Unassigned Students</h2>
            <div className="space-y-4">
              {students.map(student => (
                <div key={student.id} className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-medium">{student.name}</h3>
                  <p className="text-sm text-gray-500">{student.project}</p>
                  <div className="mt-2 flex gap-2">
                    {teachers.map(teacher => (
                      <button
                        key={teacher.id}
                        onClick={() => assignStudent(student, teacher.id)}
                        className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                      >
                        Assign to {teacher.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Teacher Assignments</h2>
            {teachers.map(teacher => (
              <div key={teacher.id} className="bg-white p-4 rounded-lg shadow mb-4">
                <div className="flex items-center gap-4 mb-4">
                  <img src={teacher.image} alt={teacher.name} className="w-12 h-12 rounded-full" />
                  <div>
                    <h3 className="font-medium">{teacher.name}</h3>
                    <p className="text-sm text-gray-500">{teacher.designation}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {assignments[teacher.id]?.map(student => (
                    <div key={student.id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                      <span>{student.name}</span>
                      <button
                        onClick={() => unassignStudent(student, teacher.id)}
                        className="text-red-500 hover:bg-red-50 p-1 rounded"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={downloadAssignments}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download Assignments
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentProjectManager;