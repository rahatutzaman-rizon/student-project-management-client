import {IoCreate} from 'react-icons/io5';
import {FaFilePdf, FaTwitch} from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import Marquee from 'react-fast-marquee';

const FeaturesSection = () => {
  return (
    <section className='mt-16 ml-16'>
      <div className="container">
   <div className='mt-8 mb-4 text-4xl text-white  bg-teal-400 font-bold'>
   <Marquee>
  The next Programm held on 6 May on  2PM 
</Marquee>
   </div>
        <h2 className="text-3xl font-semibold mb-2 text-center mt-6">Student Project Mangement&apos;s <span className="text-primary">Features</span></h2>
        <p className="max-w-[500px] mx-auto text-center mb-8">Here are given all the features that you will use to improve your project with this app </p>

        <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-6'>
          {/* <div className='bg-gray-200 p-6 rounded-lg'>
            <IoCreate className='text-6xl text-primary mb-2' />
            
            <p className='mb-4'>You can create assignment for all of your friends and they can work on it.</p>
            <Link to='/' className='btn btn-primary' onClick={() => scrollTo(0, 0)}>Create</Link>
          </div> */}
          <div className='bg-gray-200 p-6 rounded-lg'>
            <FaFilePdf className='text-5xl text-primary mb-4' />
            <h3 className='text-2xl font-semibold text-primary mb-2'>Submit Task</h3>
            <p className='mb-4'>You can submit assignment which was assigned by your friends and they can review it.</p>
            <Link to='/' className='btn btn-primary' onClick={() => scrollTo(0, 0)}>Submit</Link>
          </div>
          <div className='bg-gray-200 p-6 rounded-lg'>
            <FaTwitch className='text-5xl text-primary mb-4' />
            <h3 className='text-2xl font-semibold text-primary mb-2'>Review Task</h3>
            <p className='mb-4'>You can review and give marks an assignment that was submitted by your friends.</p>
            <Link to='/' className='btn btn-primary' onClick={() => scrollTo(0, 0)}>Review</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;