import {IoCreate} from 'react-icons/io5';
import {FaFilePdf, FaTwitch} from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const FeaturesSection = () => {
  return (
    <section className='mt-16'>
      <div className="container">
        <h2 className="text-3xl font-semibold mb-2 text-center">StudyHub&apos;s <span className="text-primary">Features</span></h2>
        <p className="max-w-[500px] mx-auto text-center mb-8">Here are given all the features that you will use to improve your group study with StudyHub!</p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          <div className='bg-gray-200 p-6 rounded-lg'>
            <IoCreate className='text-6xl text-primary mb-2' />
            <h3 className='text-2xl font-semibold text-primary mb-2'>Create Assignment</h3>
            <p className='mb-4'>You can create assignment for all of your friends and they can work on it.</p>
            <Link to='create-assignment' className='btn btn-primary' onClick={() => scrollTo(0, 0)}>Create</Link>
          </div>
          <div className='bg-gray-200 p-6 rounded-lg'>
            <FaFilePdf className='text-5xl text-primary mb-4' />
            <h3 className='text-2xl font-semibold text-primary mb-2'>Submit Assignment</h3>
            <p className='mb-4'>You can submit assignment which was assigned by your friends and they can review it.</p>
            <Link to='assignments' className='btn btn-primary' onClick={() => scrollTo(0, 0)}>Submit</Link>
          </div>
          <div className='bg-gray-200 p-6 rounded-lg'>
            <FaTwitch className='text-5xl text-primary mb-4' />
            <h3 className='text-2xl font-semibold text-primary mb-2'>Review Assignment</h3>
            <p className='mb-4'>You can review and give marks an assignment that was submitted by your friends.</p>
            <Link to='submitted-assignments' className='btn btn-primary' onClick={() => scrollTo(0, 0)}>Review</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;