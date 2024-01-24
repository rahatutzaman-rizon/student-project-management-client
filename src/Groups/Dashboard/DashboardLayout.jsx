


//import SideBar from './Sidebar';
import { Card, Label, Badge, Tooltip, Avatar } from 'flowbite-react';
import Marquee from 'react-fast-marquee';
import { FaArrowRightArrowLeft } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const truncateDescription = (text, maxWords) => {
  const words = text.split(' ');

  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(' ') + '...';
  }

  return text;
};


export const DashboardLayout = ({ task }) => {
  console.log(task);
  const truncatedDescription = truncateDescription(task?.description, 2);
  
  
  return (
    <div>
     
       <div className='flex gap-2 flex-col md:flex-row '>
      <div>
        {/* <SideBar /> */}
      </div>
      {/* <Outlet /> */}
     
      
      <div>
    
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-1 lg:px-2 py-2 bg-sky-100 ">
        <div>
        <h1 className="font-bold text-center text-4xl my-8 bg-gradient-to-r from-blue-500 via-sky-500 to-pink-500 text-transparent bg-clip-text">
      TODO
    </h1>
          {task?.status === 'todo' && (
          

          //ex
          <Card className="bg-teal-300 shadow-lg hover:shadow-xl">
      <div className="">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
           
            <div>
              <h2 className="text-xl font-semibold">{task.students[0]} </h2>
              <h2 className="text-xl font-semibold">{task.students[1]} </h2>
            </div>
          </div>
          <Link to={`/move/${task?._id}`}>
            <button className="bg-blue-500 text-white p-2 rounded-full">
              <FaArrowRightArrowLeft />
            </button>
          </Link>
        </div>
<Marquee className='text-2xl font-bold '><Label className="text-lg font-bold mb-2" value= {task.title} />  "  "  </Marquee>
        

        <div className="mb-2">
          <Label className="text-gray-600" value="Start Date" />
          <div className="text-sm">{task?.start_date}</div>
        </div>

        <div className="mb-2">
          <Label className="text-gray-600" value="Deadline" />
          <div className="text-sm">{task.deadline}</div>
        </div>

        <div>
          <Label className="text-gray-600" value="Description" />
          <Tooltip content={task.description} placement="top">
            <div className="text-xl truncate bg-sky-300">{truncatedDescription}</div>
          </Tooltip>
        </div>
      </div>
    </Card>

          )}
        </div>
        <div>
          <h1 className="font-bold text-center">Ongoing</h1>
          {task?.status === 'ongoing' && (
            <Card className="bg-gray-100 shadow-lg hover:shadow-xl">
      <div className="p-6">
        <Label className="text-lg font-bold mb-2" value={task.title} />
       <div className='flex' >
      <Link to={`/move/${task?._id}`}><button> <div className=''>
        <FaArrowRightArrowLeft/>
       </div></button></Link>
       <div>
       <h2>Move</h2>
       </div>
        </div>
{/* 
       </div>
        <div className="mb-2">
          <Label className="text-gray-600" value="Status" />
          <Badge className={`bg-${task.status === 'complete' ? 'green' : 'orange'}-500 text-white ml-2`}>
            {task.status}
          </Badge>
        </div> */}

        <div className="mb-2">
          <Label className="text-gray-600" value="Start Date" />
          <div className="text-sm">{task.start_date}</div>
        </div>

        <div className="mb-2">
          <Label className="text-gray-600" value="Deadline" />
          <div className="text-sm">{task.deadline}</div>
        </div>

        <div>
          <Label className="text-gray-600" value="Description" />
          <Tooltip content={task.description} placement="top">
            <div className="text-sm truncate">{truncatedDescription}</div>
          </Tooltip>
        </div>
        </div>
    </Card>
          )}
        </div>
        <div>
          <h1 className="font-bold text-center">Complete</h1>
          {task?.status === 'complete' && (
            <Card className="bg-gray-100 shadow-lg hover:shadow-xl">
      <div className="p-6">
        <Label className="text-lg font-bold mb-2" value={task.title} />
       <div className='flex' >
      <Link to={`/move/${task?._id}`}><button> <div className=''>
        <FaArrowRightArrowLeft/>
       </div></button></Link>
       <div>
       <h2>Move</h2>
       </div>
        </div>
{/* 
       </div>
        <div className="mb-2">
          <Label className="text-gray-600" value="Status" />
          <Badge className={`bg-${task.status === 'complete' ? 'green' : 'orange'}-500 text-white ml-2`}>
            {task.status}
          </Badge>
        </div> */}

        <div className="mb-2">
          <Label className="text-gray-600" value="Start Date" />
          <div className="text-sm">{task.start_date}</div>
        </div>

        <div className="mb-2">
          <Label className="text-gray-600" value="Deadline" />
          <div className="text-sm">{task.deadline}</div>
        </div>

        <div>
          <Label className="text-gray-600" value="Description" />
          <Tooltip content={task.description} placement="top">
            <div className="text-sm truncate">{truncatedDescription}</div>
          </Tooltip>
        </div>
        </div>
    </Card>
          )}
        </div>
        <div>
          <h1 className="font-bold text-center">incomplete</h1>
          {task?.status === 'incomplete' && (
            <Card className="bg-gray-100 shadow-lg hover:shadow-xl">
      <div className="p-6">
        <Label className="text-lg font-bold mb-2" value={task.title} />
       <div className='flex' >
      <Link to={`/move/${task?._id}`}><button> <div className=''>
        <FaArrowRightArrowLeft/>
       </div></button></Link>
       <div>
       <h2>Move</h2>
       </div>
        </div>
{/* 
       </div>
        <div className="mb-2">
          <Label className="text-gray-600" value="Status" />
          <Badge className={`bg-${task.status === 'complete' ? 'green' : 'orange'}-500 text-white ml-2`}>
            {task.status}
          </Badge>
        </div> */}

        <div className="mb-2">
          <Label className="text-gray-600" value="Start Date" />
          <div className="text-sm">{task.start_date}</div>
        </div>

        <div className="mb-2">
          <Label className="text-gray-600" value="Deadline" />
          <div className="text-sm">{task.deadline}</div>
        </div>

        <div>
          <Label className="text-gray-600" value="Description" />
          <Tooltip content={task.description} placement="top">
            <div className="text-sm truncate">{truncatedDescription}</div>
          </Tooltip>
        </div>
        </div>
    </Card>
          )}
        </div>
      </div>
      </div>
    </div>
   
    </div>
   
  );
};
