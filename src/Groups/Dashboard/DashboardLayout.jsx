


//import SideBar from './Sidebar';
import { Card, Label, Badge, Tooltip } from 'flowbite-react';
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
  const truncatedDescription = truncateDescription(task.description, 2);
  
  
  return (
    <div>
     
       <div className='flex gap-2 flex-col md:flex-row bg-gray-300'>
      <div>
        {/* <SideBar /> */}
      </div>
      {/* <Outlet /> */}
     
      
      <div>
    
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:px-12 py-6 bg-gray-300">
        <div>
          <h1 className="font-bold text-center">TODO</h1>
          {task?.status === 'todo' && (
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
