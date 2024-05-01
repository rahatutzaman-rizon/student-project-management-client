import { Link } from "react-router-dom";
import heroImg from '../../assets/images/hero-img.png';

const HeroSection = () => {
  return (
    <section className="py-8 md:py-4 mx-20">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8 [&>*]:flex-1">
          <div>
            <h1 className="text-5xl font-semibold leading-[1.2] mb-2">Welcome to <span className="text-primary">Student </span>Project Mangement</h1>
            <p className="max-w-[550px]">Student Project Management is an online  project based web platform, where people can took part in group study with his friends. They can create, submit, review assignments of each other in this platform.</p>
          
          </div>

          <div>
            <img className="w-full max-w-[450px] block mx-auto" src={heroImg} alt="Hero Section Image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;