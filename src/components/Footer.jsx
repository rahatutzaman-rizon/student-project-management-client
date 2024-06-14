import {BsFacebook, BsInstagram, BsTwitter} from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='mt-16'>
      <div className='bg-gray-200 py-8 md:py-12'>
        <div className="container flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div className="ml-8 items-center gap-2">
             
              <span className="text-2xl font-semibold"><span className="text-primary">Student</span>Project Management</span>
            </div>
            <p className='max-w-[400px] mt-3 ml-6'>Let&apos;s study together with friends and get higher facilities in group study with this platform.</p>
            <div className='text-2xl text-primary flex items-center gap-4 mt-6 ml-6'>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><BsFacebook /></a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><BsInstagram /></a>
              <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer"><BsTwitter /></a>
            </div>
          </div>

          <div>
            <h2 className='text-2xl font-semibold mb-4'>Pages</h2>
            <Link className='block mb-1' to='/' onClick={() => scrollTo(0, 0)}>Home</Link>
            <Link className='block mb-1' to='/assignment' onClick={() => scrollTo(0, 0)}>Assignment</Link>
            <Link className='block mb-1' to='/login' onClick={() => scrollTo(0, 0)}>Login</Link>
          </div>

          <div>
            <h2 className='text-2xl font-semibold mb-4'>Social</h2>
            <a className='block mb-1' href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a className='block mb-1' href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a className='block mb-1' href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
        </div>
      </div>

      <div className='bg-sky-400 text-white text-center py-4'>
        <div className="container">
          <p>Copyright&copy;{new Date().getFullYear()} - Student Project Mangement. All rights reserved. Developed by <a className='font-bold' href="" target="_blank" rel="noopener noreferrer">Rizon-Rasel</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;