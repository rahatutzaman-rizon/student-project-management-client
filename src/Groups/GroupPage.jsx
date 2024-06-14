import { useLoaderData, useParams } from 'react-router-dom';
import { DashboardLayout } from './Dashboard/DashboardLayout';
import SideBar from './Dashboard/Sidebar';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Button, Label, Select, TextInput, Textarea } from 'flowbite-react';
import { useState } from 'react';

const GroupPage = () => {

  const [showForm, setShowForm] = useState(false); 

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const { id } = useParams();
  console.log(id)
  const member = useLoaderData();
  const {title}=member;
  //console.log(member.title)
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const status = ["todo", "ongoing", "complete", "incomplete"];
  const [selectedCategory, setSelectedCategory] = useState(status[0]);
 
  const handleChangeSelectedValue = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const group = form.group.value;
    const status = form.status.value;
    const email = form.email.value;
    const title = form.title.value;
    const deadline = form.deadline.value;
    const start_date = form.start_date.value;
    const description = form.description.value;
    

    const allObject = {
      group,
      email,
      title,
     
      deadline,
      start_date,
      description,status
    };
    console.log(allObject)

    fetch("https://student-project-management-server.vercel.app/member", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(allObject),
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          Swal.fire({
            title: 'Success!',
            text: 'Task added successfully',
            icon: 'success',
            confirmButtonText: 'Cool'
          })
          navigate(`/group/${id}`);
        }
      })
      .catch(error => {
        console.error("Error adding task:", error);
      });
  };

  return (
    <div>
      <div>
      <h2>hii{title}</h2>
      <Button className="bg-teal-500" onClick={handleToggleForm}>
          {showForm ? 'Close Form' : 'Add Task'}
        </Button>
         
        {showForm && (

        <form onSubmit={handleSubmit}>
          <div className='lg:w-1/2 mb-2 block text-3xl font-bold'>
            <Label htmlFor="group" value="Group" />
          </div>
          <TextInput
            id="name"
            placeholder={id}
            required
            type="text"
            name="group"
            className='w-full mb-4'
          />

          <div className='lg:w-1/2 mb-2 block'>
            <Label htmlFor="title" value="title" />
          </div>
          <TextInput
            id="title"
            placeholder="Title"
            required
            type="text"
            name='title'
            className='w-full mb-4'
          />

<div className='lg:w-1/2 mb-2 block'>
            <Label htmlFor="email" value="email" />
          </div>
          <TextInput
            id="email"
            placeholder={email}
            required
            type="email"
            name='email'
            className='w-full mb-4'
          />

          <div className='lg:w-1/2 mb-2 block'>
            <Label htmlFor="status" value="status" />
          </div>
          <Select
            id="status"
            name="category"
            className="w-full rounded mb-4"
            value={selectedCategory}
            onChange={handleChangeSelectedValue}
          >
            {status?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>

          <div className="form-control md:w-1/2 ml-4 mb-4">
            <label className="label">
              <span className="label-text">Start_date</span>
            </label>
            <label className="input-group">
              <input type="date" name="start_date" placeholder="Start_date" className="input input-bordered w-full" />
            </label>
          </div>

          <div className="form-control md:w-1/2 ml-4 mb-4">
            <label className="label">
              <span className="label-text">Deadlines</span>
            </label>
            <label className="input-group">
              <input type="date" name="deadline" placeholder="Deadline" className="input input-bordered w-full" />
            </label>
          </div>

          <div className='mb-2 block'>
            <Label htmlFor="description" value="Description" />
          </div>
          <Textarea
            id='description'
            placeholder="Description"
            required
            type="text"
            name='description'
            className='w-1/2 mb-4'
            rows={4}
          />

          <Button className="bg-teal-500" type="submit">
            Add Task
          </Button>
        </form>

        )}
      </div>

      <div className='flex'>
        <div>
          <SideBar></SideBar>
        </div>
        <div>
          {member?.map(task => (

            <DashboardLayout key={task._id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupPage;
