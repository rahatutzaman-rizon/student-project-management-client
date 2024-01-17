import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const UserProfiles = () => {
    return (
        <div className='max-w-screen-xl mx-auto bg-gradient-to-r from-[#301540] to-[#402540]'>
            <p className='px-4 text-xl text-center font-semibold py-12 md:text-2xl lg:text-3xl text-white'>Discover How SCC Technovision Inc. Benefits Different Professionals</p>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 10000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className='space-y-4 px-6 lg:px-0 pb-8 mx-4 text-white'>
                        <h1 className='text-center font-bold text-xl md:text-3xl'>Task Organization</h1>
                        <div className='flex justify-center items-center'>
                            <img className='h-[200px] md:h-[400px] rounded-lg' src="https://i.ibb.co/XF1yz0Y/360-F-601171841-ek6-D8jhk0oh3rw-Qg-Sk-Bd-DHcat-La-JZ4i-Q.jpg" alt="" />
                        </div>
                        <div>
                            <p className='font-bold'>Efficiency Boost: </p>
                            <p>Developers leverage the task management system to streamline project workflows, ensuring tasks are organized, priorities are clear, and collaboration is seamless—resulting in heightened development efficiency.</p>
                        </div>
                        <div>
                            <p className='font-bold'>Deadline Mastery: </p>
                            <p>With precise task tracking and deadline reminders, developers confidently meet project timelines, maintaining a proactive and agile approach to software development.</p>
                        </div>
                        <div>
                            <p className='font-bold'>Enhanced Collaboration: </p>
                            <p>The task management system fosters effective teamwork by providing a centralized platform for communication, file sharing, and task updates, promoting collaboration among developers and project stakeholders.</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='space-y-4 px-6 lg:px-0 pb-8 mx-4 text-white'>
                        <h1 className='text-center font-bold text-xl md:text-3xl'>Corporate Professionals</h1>
                        <div className='flex justify-center items-center'>
                            <img className='h-[200px] md:h-[400px]' src="https://i.ibb.co/gzTtJbJ/confident-businessman-with-smile-1308-134106.jpg" alt="" />
                        </div>
                        <div>
                            <p className='font-bold'>Optimized Workflows: </p>
                            <p>Corporate professionals harness the task management system to optimize workflows, enabling efficient task allocation, progress tracking, and seamless collaboration among team members for enhanced overall productivity.</p>
                        </div>
                        <div>
                            <p className='font-bold'>Strategic Planning: </p>
                            <p>The system empowers corporate professionals with strategic planning capabilities, facilitating the organization and prioritization of tasks, resulting in better decision-making and goal attainment.</p>
                        </div>
                        <div>
                            <p className='font-bold'>Team Coordination: </p>
                            <p>Task management fosters improved team coordination by providing a centralized hub for communication, file sharing, and progress updates, ensuring all team members are aligned and focused on shared objectives.</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='space-y-4 px-6 lg:px-0 pb-8 mx-4 text-white'>
                        <h1 className='text-center font-bold text-xl md:text-3xl'>Bankers</h1>
                        <div className='flex justify-center items-center'>
                            <img className='h-[200px] md:h-[400px]' src="https://i.ibb.co/6yn9JGz/bank-manager-avatar-vector-25996756.jpg" alt="" />
                        </div>
                        <div>
                            <p className='font-bold'>Financial Task Organization: </p>
                            <p>Bankers optimize financial task management using the system, ensuring precise organization, tracking, and completion of crucial financial activities for enhanced operational efficiency.</p>
                        </div>
                        <div>
                            <p className='font-bold'>Deadline Adherence: </p>
                            <p>Elevate deadline adherence as bankers leverage the task management system to set clear timelines, prioritize tasks, and seamlessly coordinate with team members, ensuring timely project execution.</p>
                        </div>
                        <div>
                            <p className='font-bold'>Enhanced Project Oversight: </p>
                            <p>Gain comprehensive oversight of projects with the system's capabilities, allowing bankers to monitor progress, allocate resources effectively, and ensure successful project outcomes in the dynamic financial sector.</p>
                        </div>

                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='space-y-4 px-6 lg:px-0 pb-8 mx-4 text-white'>
                        <h1 className='text-center font-bold text-xl md:text-3xl'>Designers</h1>
                        <div className='flex justify-center items-center'>
                            <img className='h-[200px] md:h-[400px] rounded-lg' src="https://i.ibb.co/Rv28FKH/amelie-mourichon-sv8o-OQa-Ub-o-unsplash.jpg" alt="" />
                        </div>
                        <div>
                            <p className='font-bold'>Creative Workflow Enhancement: </p>
                            <p>Designers amplify their creative workflow with the task management system, ensuring efficient task organization, seamless collaboration, and timely project delivery for unparalleled design precision.</p>
                        </div>
                        <div>
                            <p className='font-bold'>Collaborative Excellence: </p>
                            <p>Foster collaborative excellence as designers utilize the system to streamline communication, share assets, and coordinate design tasks, ensuring cohesive teamwork and delivering visually stunning projects.</p>
                        </div>
                        <div>
                            <p className='font-bold'>Project Deadline Mastery: </p>
                            <p>Achieve project deadline mastery by leveraging the task management system's capabilities to set clear timelines, prioritize design tasks, and monitor progress, allowing designers to meet creative milestones with precision.</p>
                        </div>

                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='space-y-4 px-6 lg:px-0 pb-16 mx-4 text-white'>
                        <h1 className='text-center font-bold text-xl md:text-3xl'>Entrepreneurs</h1>
                        <div className='flex justify-center items-center'>
                            <img className='h-[200px] md:h-[400px] rounded-lg' src="https://i.ibb.co/ZJJsVsc/cute-man-get-idea-cartoon-vector-icon-illustration-people-business-icon-concept-isolated-premium-vec.jpg" alt="" />
                        </div>
                        <div>
                            <p className='font-bold'>Strategic Business Growth: </p>
                            <p>Entrepreneurs drive strategic business growth with the task management system, effectively organizing tasks, managing projects, and optimizing resource allocation for sustained success.</p>
                        </div>
                        <div>
                            <p className='font-bold'>Operational Efficiency: </p>
                            <p>Enhance operational efficiency as entrepreneurs leverage the system to streamline business tasks, delegate responsibilities, and ensure a smooth workflow, fostering productivity and minimizing bottlenecks.</p>
                        </div>
                        <div>
                            <p className='font-bold'>Proactive Decision-Making: </p>
                            <p>Facilitate proactive decision-making with real-time insights into project progress and timelines, empowering entrepreneurs to make informed decisions, adapt strategies, and steer their ventures towards continual success.</p>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default UserProfiles;