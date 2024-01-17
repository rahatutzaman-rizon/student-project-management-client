import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './Sidebar';

export const DashboardLayout = ({ task }) => {
  return (
    <div className='flex gap-4 flex-col md:flex-row bg-cyan-300'>
      <div>
        <SideBar />
      </div>
      <Outlet />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:px-12 py-6 bg-stone-300">
        <div>
          <h1 className="font-bold text-center">TODO</h1>
          {task.status === 'todo' && (
            <div className="border items-center flex p-3 rounded-lg my-3 justify-between" key={task._id}>
              <div>
                <h1 className="font-semibold">Title: {task.title}</h1>
                <h3 className="font-medium">Deadline: {task.deadline}</h3>
                <p>{task.priority}</p>
                <p>{task.description.length > 20 ? task.description.slice(0, 20) : task.description}...</p>
                <p>Task Added By : <span className="font-semibold">{task.email}</span></p>
              </div>
            </div>
          )}
        </div>
        <div>
          <h1 className="font-bold text-center">ONGOING</h1>
          {task.status === 'ongoing' && (
            <div className="border items-center flex p-3 rounded-lg my-3 justify-between" key={task._id}>
              <div>
                <h1 className="font-semibold">Title: {task.title}</h1>
                <h3 className="font-medium">Deadline: {task.deadline}</h3>
                <p>{task.priority}</p>
                <p>{task.description.length > 20 ? task.description.slice(0, 20) : task.description}...</p>
                <p>Task Added By : <span className="font-semibold">{task.email}</span></p>
              </div>
            </div>
          )}
        </div>
        <div>
          <h1 className="font-bold text-center">Completed</h1>
          {task.status === 'completed' && (
            <div className="border items-center flex p-6 rounded-lg my-4 justify-between" key={task._id}>
              <div>
                <h1 className="font-semibold">Title: {task.title}</h1>
                <h3 className="font-medium">Deadline: {task.deadline}</h3>
                <p>{task.priority}</p>
                <p>{task.description.length > 20 ? task.description.slice(0, 20) : task.description}...</p>
                <p>Task Added By : <span className="font-semibold">{task.email}</span></p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
