
import YouTube from 'react-youtube';
import { motion } from 'framer-motion';


export default function ModernLandingPage() {
  const videoOpts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 0,
      rel: 0,
      showinfo: 0,
      mute: 1,
      loop: 1,
      playlist: 'UL0uEywO-EA',
    },
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      <div className="relative h-screen overflow-hidden">
        <YouTube
          videoId="UL0uEywO-EA"
          opts={videoOpts}
          onReady={(event) => event.target.playVideo()}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            Student Project Progress Management
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Streamline Your Academic Journey
          </motion.p>
          <motion.button 
            className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Get Started
          </motion.button>
        </div>
      </div>

     
    

   
    </div>
  );
}