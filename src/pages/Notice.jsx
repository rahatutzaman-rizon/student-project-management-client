import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, Calendar, Users, CheckCircle, Clock, 
  ListTodo, MessageCircle, User, Mail, FileText,
  AlertCircle, ArrowRight, CheckCircle2, XCircle, Send
} from 'lucide-react';

const WorkflowDiagram = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);

  const fadeInUpVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  const lineVariants = {
    initial: { pathLength: 0 },
    animate: { 
      pathLength: 1,
      transition: { duration: 1.5, ease: "easeInOut" }
    }
  };

  const pulseVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  const teacherWorkflow = [
    { Icon: FileText, title: "Project Planning", desc: "Define objectives and milestones" },
    { Icon: Mail, title: "Task Assignment", desc: "Distribute via email" },
    { Icon: ListTodo, title: "Track Progress", desc: "Monitor development" },
    { Icon: CheckCircle, title: "Review & Feedback", desc: "Evaluate deliverables" }
  ];

  const studentWorkflow = [
    { Icon: Mail, title: "Receive Tasks", desc: "Check email assignments" },
    { Icon: FileText, title: "Review Requirements", desc: "Analyze specifications" },
    { Icon: MessageCircle, title: "Development", desc: "Work on deliverables" },
    { Icon: Send, title: "Submit Work", desc: "Upload completed tasks" }
  ];

  const tasks = [
    { title: "Project Planning", completed: true },
    { title: "Task Distribution", completed: true },
    { title: "Development Phase", completed: false },
    { title: "Final Review", completed: false },
  ];

  const renderConnectingLines = () => (
    <svg className="absolute w-full h-full" style={{ zIndex: 0 }}>
      {/* Horizontal Main Lines */}
      <motion.path
        d="M200 150 L400 150 L600 150 L800 150"
        stroke="rgba(59, 130, 246, 0.5)"
        strokeWidth="2"
        fill="none"
        variants={lineVariants}
        initial="initial"
        animate="animate"
      />
      <motion.path
        d="M200 350 L400 350 L600 350 L800 350"
        stroke="rgba(99, 102, 241, 0.5)"
        strokeWidth="2"
        fill="none"
        variants={lineVariants}
        initial="initial"
        animate="animate"
      />

      {/* Animated Flow Lines */}
      <motion.circle
        r="4"
        fill="#60A5FA"
        initial={{ offsetDistance: "0%", opacity: 0 }}
        animate={{
          offsetDistance: "100%",
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <animateMotion
          dur="3s"
          repeatCount="indefinite"
          path="M200 150 L400 150 L600 150 L800 150"
        />
      </motion.circle>

      {/* Vertical Connections with Gradient */}
      {[200, 400, 600, 800].map((x, i) => (
        <g key={i}>
          <defs>
            <linearGradient id={`grad${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#6366F1', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <motion.path
            d={`M${x} 150 L${x} 350`}
            stroke={`url(#grad${i})`}
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
            variants={lineVariants}
            initial="initial"
            animate="animate"
          />
        </g>
      ))}

      {/* Diagonal Flow Lines */}
      <motion.path
        d="M200 150 Q300 250 400 350"
        stroke="rgba(147, 197, 253, 0.3)"
        strokeWidth="2"
        fill="none"
        variants={lineVariants}
        initial="initial"
        animate="animate"
      />
      <motion.path
        d="M600 150 Q700 250 800 350"
        stroke="rgba(147, 197, 253, 0.3)"
        strokeWidth="2"
        fill="none"
        variants={lineVariants}
        initial="initial"
        animate="animate"
      />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          variants={fadeInUpVariants}
          initial="initial"
          animate="animate"
        >
          <h1 className="text-4xl font-bold text-white mb-6">
            Project Management Workflow
          </h1>
          <motion.div 
            variants={pulseVariants}
            initial="initial"
            animate="animate"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 rounded-full text-white"
          >
            <Mail className="w-5 h-5" />
            <span>Email-Based Task Assignment System</span>
          </motion.div>
        </motion.div>

        {/* Workflow Diagram */}
        <div className="relative">
          {renderConnectingLines()}

          {/* Teacher Workflow Row */}
          <div className="relative z-10 grid grid-cols-4 gap-8 mb-16">
            {teacherWorkflow.map((item, index) => (
              <motion.div
                key={index}
                className={`bg-gray-800 p-6 rounded-xl shadow-lg transition-all duration-300 ${
                  hoveredNode === `teacher-${index}` ? 'shadow-blue-500/40' : 'hover:shadow-blue-500/20'
                }`}
                variants={fadeInUpVariants}
                initial="initial"
                animate="animate"
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                onHoverStart={() => setHoveredNode(`teacher-${index}`)}
                onHoverEnd={() => setHoveredNode(null)}
                onClick={() => setSelectedNode(`teacher-${index}`)}
              >
                <motion.div 
                  className="flex items-center justify-center mb-4"
                  variants={pulseVariants}
                  animate={hoveredNode === `teacher-${index}` ? "animate" : "initial"}
                >
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <item.Icon className="w-8 h-8 text-white" />
                  </motion.div>
                </motion.div>
                <h3 className="text-lg font-semibold text-center mb-2 text-white">{item.title}</h3>
                <p className="text-sm text-gray-400 text-center">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Student Workflow Row */}
          <div className="relative z-10 grid grid-cols-4 gap-8 mb-16">
            {studentWorkflow.map((item, index) => (
              <motion.div
                key={index}
                className={`bg-gray-800 p-6 rounded-xl shadow-lg transition-all duration-300 ${
                  hoveredNode === `student-${index}` ? 'shadow-indigo-500/40' : 'hover:shadow-indigo-500/20'
                }`}
                variants={fadeInUpVariants}
                initial="initial"
                animate="animate"
                transition={{ delay: index * 0.2 + 0.4 }}
                whileHover={{ scale: 1.05 }}
                onHoverStart={() => setHoveredNode(`student-${index}`)}
                onHoverEnd={() => setHoveredNode(null)}
              >
                <motion.div 
                  className="flex items-center justify-center mb-4"
                  variants={pulseVariants}
                  animate={hoveredNode === `student-${index}` ? "animate" : "initial"}
                >
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-full flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <item.Icon className="w-8 h-8 text-white" />
                  </motion.div>
                </motion.div>
                <h3 className="text-lg font-semibold text-center mb-2 text-white">{item.title}</h3>
                <p className="text-sm text-gray-400 text-center">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Task Status Indicators */}
          <div className="grid grid-cols-4 gap-8 mb-12">
            {tasks.map((task, index) => (
              <motion.div
                key={index}
                className="flex items-center bg-gray-800/50 p-4 rounded-lg"
                variants={fadeInUpVariants}
                initial="initial"
                animate="animate"
                transition={{ delay: index * 0.1 + 0.8 }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div 
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    task.completed ? 'bg-green-500' : 'bg-gray-600'
                  }`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  ) : (
                    <Clock className="w-5 h-5 text-white" />
                  )}
                </motion.div>
                <span className="ml-3 text-sm font-medium text-white">{task.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowDiagram;