'use client'

import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import * as XLSX from 'xlsx'
import { FileUp, Download, X, User, Mail, Briefcase, Book, Calendar } from 'lucide-react'

const teachersData = [
  {
    "id": 1,
    "name": "DR. MUHAMMAD SHAHIN UDDIN",
    "designation": "PROFESSOR",
    "email": "shahin.mbstu@gmail.com",
    "image": "https://i.ibb.co/jbdCMcJ/1.jpg",
    "specialization": "Artificial Intelligence",
    "officeHours": "Mon, Wed 2-4 PM"
  },
  {
    "id": 2,
    "name": "DR. SAJJAD WAHEED",
    "designation": "PROFESSOR",
    "email":"sajjad@mbstu.ac.bd",
    "image": "https://i.ibb.co/BwXQmYH/2.jpg",
    "specialization": "Data Science",
    "officeHours": "Tue, Thu 1-3 PM"
  },
  {
    "id": 3,
    "name": "DR. MONIR MORSHED",
    "designation": "PROFESSOR",
    "email": "monirmorshed.ict@mbstu.ac.bd",
    "image": "https://i.ibb.co/dj6B55y/3.jpg",
    "specialization": "Computer Networks",
    "officeHours": "Wed, Fri 10 AM-12 PM"
  },
  {
    "id": 4,
    "name": "MOHAMMAD BADRUL ALAM MIAH",
    "designation": "PROFESSOR",
    "email": "badrul.ict@gmail.com",
    "image": "https://i.ibb.co/Q6y9ZH4/4.jpg",
    "specialization": "Software Engineering",
    "officeHours": "Mon, Thu 3-5 PM"
  },
  {
    "id": 5,
    "name": "DR. MST. NARGIS AKTER",
    "designation": "PROFESSOR",
    "email": "nagis_ict@mbstu.ac.bd", 
    "image": "https://i.ibb.co/NtrKLbS/5.jpg",
    "specialization": "Machine Learning",
    "officeHours": "Tue, Fri 11 AM-1 PM"
  },
  {
    "id": 6,
    "name": "DR. MD. ABIR HOSSAIN",
    "designation": "ASSOCIATE PROFESSOR",
    "email":"abir.hossain@mbstu.ac.bd",
    "image": "https://i.ibb.co/Xjdxx6d/6.jpg",
    "specialization": "Cybersecurity",
    "officeHours": "Mon, Wed 9-11 AM"
  },
  {
    "id": 7,
    "name": "BIKASH KUMAR PAUL",
    "designation": "ASSISTANT PROFESSOR",
    "email":"bikash@mbstu.ac.bd",
    "image": "https://i.ibb.co/XX9HQsS/7.jpg",
    "specialization": "Web Technologies",
    "officeHours": "Thu, Fri 2-4 PM"
  }
]

const StudentProjectManager = () => {
  const [students, setStudents] = useState([])
  const [assignments, setAssignments] = useState({})

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result)
      const workbook = XLSX.read(data, { type: 'array' })
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
      const parsedData = XLSX.utils.sheet_to_json(firstSheet)
      setStudents(parsedData)
    }
    reader.readAsArrayBuffer(file)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    },
    onDrop
  })

  const assignStudent = (student, teacherId) => {
    setAssignments(prev => ({
      ...prev,
      [teacherId]: [...(prev[teacherId] || []), student]
    }))
    setStudents(prev => prev.filter(s => s.id !== student.id))
  }

  const unassignStudent = (student, teacherId) => {
    setAssignments(prev => ({
      ...prev,
      [teacherId]: prev[teacherId].filter(s => s.id !== student.id)
    }))
    setStudents(prev => [...prev, student])
  }

  const downloadDemoFile = () => {
    const demoData = [
      { id: 1, name: 'John Doe', email: 'john@example.com', project: 'AI Project', semester: '7th', cgpa: '3.8' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', project: 'Web Development', semester: '8th', cgpa: '3.9' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', project: 'Mobile App', semester: '7th', cgpa: '3.7' },
    ]
    const ws = XLSX.utils.json_to_sheet(demoData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Students')
    XLSX.writeFile(wb, 'demo_students.xlsx')
  }

  const downloadAssignments = (teacherId) => {
    const teacher = teachersData.find(t => t.id === teacherId)
    const data = assignments[teacherId]?.map(student => ({
      'Teacher': teacher.name,
      'Student': student.name,
      'Project': student.project,
      'Email': student.email,
      'Semester': student.semester,
      'CGPA': student.cgpa
    })) || []

    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Assignments')
    XLSX.writeFile(wb, `${teacher.name}_assignments.xlsx`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001f3f] to-[#0074D9] p-8 text-white mb-[-64px]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-300">
          Student Project Assignment System
        </h1>

        <div className="mb-12 flex justify-center">
          <button
            onClick={downloadDemoFile}
            className="bg-white text-[#001f3f] hover:bg-blue-100 font-bold py-3 px-6 rounded-full inline-flex items-center transition duration-300 ease-in-out transform hover:scale-105"
          >
            <Download className="mr-2 h-5 w-5" />
            Download Demo File
          </button>
        </div>

        <div
          {...getRootProps()}
          className="border-4 border-dashed border-white/50 rounded-lg p-12 text-center mb-12 cursor-pointer hover:bg-white/10 transition duration-300 ease-in-out"
        >
          <input {...getInputProps()} />
          <FileUp className="mx-auto h-16 w-16 text-white mb-4" />
          <p className="text-xl">
            {isDragActive ? "Drop the Excel file here" : "Drop Excel file here or click to upload"}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-8">
            <h2 className="text-3xl font-semibold mb-6">Unassigned Students</h2>
            <div className="space-y-6">
              {students.map(student => (
                <div key={student.id} className="bg-white/20 rounded-lg p-6 transition duration-300 ease-in-out hover:bg-white/30">
                  <h3 className="font-bold text-xl mb-2">{student.name}</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <p className="text-sm"><Mail className="inline mr-2 h-4 w-4" />{student.email}</p>
                    <p className="text-sm"><Book className="inline mr-2 h-4 w-4" />{student.project}</p>
                    <p className="text-sm"><User className="inline mr-2 h-4 w-4" />Semester: {student.semester}</p>
                    <p className="text-sm"><Calendar className="inline mr-2 h-4 w-4" />CGPA: {student.cgpa}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {teachersData.map(teacher => (
                      <button
                        key={teacher.id}
                        onClick={() => assignStudent(student, teacher.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white text-xs py-2 px-3 rounded-full transition duration-300 ease-in-out"
                      >
                        Assign to {teacher.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-12">
            {teachersData.map(teacher => (
              <div key={teacher.id} className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">{teacher.name}</h2>
                    <p className="text-blue-300">{teacher.designation}</p>
                  </div>
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-20 h-20 rounded-full border-4 border-white/50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <p className="text-sm"><Mail className="inline mr-2 h-4 w-4" />{teacher.email}</p>
                  <p className="text-sm"><Briefcase className="inline mr-2 h-4 w-4" />{teacher.specialization}</p>
                  <p className="text-sm"><Calendar className="inline mr-2 h-4 w-4" />{teacher.officeHours}</p>
                </div>
                <div className="space-y-3">
                  {assignments[teacher.id]?.map(student => (
                    <div key={student.id} className="flex justify-between items-center bg-white/20 p-3 rounded-lg">
                      <span>{student.name} - {student.project}</span>
                      <button
                        onClick={() => unassignStudent(student, teacher.id)}
                        className="text-red-400 hover:bg-red-500/20 p-1 rounded-full transition duration-300 ease-in-out"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => downloadAssignments(teacher.id)}
                  className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-full inline-flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-105"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Assignments
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentProjectManager

