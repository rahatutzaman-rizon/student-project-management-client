import React, { useState } from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
import { 
  FaRobot, 
  FaNetworkWired, 
  FaCode, 
  FaCloudUploadAlt, 
  FaDatabase, 
  FaBookOpen, 
  FaGithub, 
  FaDocker, 
  FaLinux,
  FaPython,
  FaJava,
  FaReact,
  FaExternalLinkAlt 
} from 'react-icons/fa';

const ResourceCard = ({ link, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const springProps = useSpring({
    from: { opacity: 0, transform: 'scale(0.8)' },
    to: {
      opacity: inView ? 1 : 0,
      transform: inView ? 'scale(1)' : 'scale(0.8)'
    },
    config: config.gentle,
    delay: index * 200
  });

  const hoverProps = useSpring({
    transform: isHovered 
      ? 'translateY(-10px) scale(1.05)' 
      : 'translateY(0px) scale(1)',
    boxShadow: isHovered
      ? '0 20px 25px -5px rgba(0, 0, 255, 0.3)'
      : '0 10px 15px -5px rgba(0, 0, 0, 0.1)'
  });

  return (
    <animated.div 
      ref={ref}
      style={{...springProps, ...hoverProps}}
      className="bg-gray-800 p-6 rounded-2xl border border-gray-700 transition-all"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center mb-4">
        {link.icon}
        <h2 className="ml-4 text-xl font-bold text-white">
          {link.title}
        </h2>
      </div>
      <p className="text-gray-400 mb-4 text-sm">{link.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {link.tags.map(tag => (
          <span 
            key={tag} 
            className="px-3 py-1 bg-gray-700 text-xs rounded-full text-gray-300"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <a 
          href={link.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 flex items-center"
        >
          <FaExternalLinkAlt className="mr-2" />
          Explore
        </a>
      </div>
    </animated.div>
  );
};

const AcademicResources = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const resourceLinks = [
    // Robotics Resources
    {
      id: 1,
      title: "ROS (Robot Operating System)",
      category: "robotics",
      description: "Flexible framework for writing robot software",
      url: "https://www.ros.org/",
      icon: <FaRobot className="text-blue-400 text-3xl" />,
      tags: ["Robotics", "Open Source"]
    },
    {
      id: 2,
      title: "OpenCV",
      category: "robotics",
      description: "Computer vision and machine learning library",
      url: "https://opencv.org/",
      icon: <FaCode className="text-green-400 text-3xl" />,
      tags: ["Vision", "AI"]
    },
    // Networking Resources
    {
      id: 3,
      title: "Cisco Networking Academy",
      category: "networking",
      description: "Global platform for networking education",
      url: "https://www.netacad.com/",
      icon: <FaNetworkWired className="text-purple-400 text-3xl" />,
      tags: ["Certification", "Training"]
    },
    {
      id: 4,
      title: "Wireshark",
      category: "networking",
      description: "World's most popular network protocol analyzer",
      url: "https://www.wireshark.org/",
      icon: <FaCloudUploadAlt className="text-red-400 text-3xl" />,
      tags: ["Analysis", "Security"]
    },
    // Software Development Frameworks
    {
      id: 5,
      title: "TensorFlow",
      category: "framework",
      description: "Machine learning and AI development platform",
      url: "https://www.tensorflow.org/",
      icon: <FaDatabase className="text-yellow-400 text-3xl" />,
      tags: ["AI", "Machine Learning"]
    },
    {
      id: 6,
      title: "Django",
      category: "framework",
      description: "High-level Python web framework",
      url: "https://www.djangoproject.com/",
      icon: <FaPython className="text-blue-500 text-3xl" />,
      tags: ["Web", "Python"]
    },
    {
      id: 7,
      title: "Docker",
      category: "framework",
      description: "Containerization and deployment platform",
      url: "https://www.docker.com/",
      icon: <FaDocker className="text-blue-600 text-3xl" />,
      tags: ["DevOps", "Deployment"]
    }
  ];

  const filteredResources = activeCategory === 'all' 
    ? resourceLinks 
    : resourceLinks.filter(link => link.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Tech & Research Resources
        </h1>

        <div className="flex justify-center space-x-4 mb-12">
          {['all', 'robotics', 'networking', 'framework'].map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full capitalize ${
                activeCategory === category 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((link, index) => (
            <ResourceCard key={link.id} link={link} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AcademicResources;