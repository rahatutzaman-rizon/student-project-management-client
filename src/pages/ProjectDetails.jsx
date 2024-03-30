import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Button, Label, TextInput, Textarea, Select } from 'flowbite-react';

const ProjectDetails = () => {
  const { id, team } = useParams();
  const [project, setProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    number: '',
    title: '',
    description: '',
    deadline: '',
  
    status: 'Not Started',
  });

  useEffect(() => {
    fetch(`http://localhost:5000/${team}/${id}`)
      .then((response) => response.json())
      .then((data) => setProject(data));
  }, [id, team]);

  if (!project) {
    return <div>Loading...</div>;
  }

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleAddTask = async () => {
    try {
      const response = await fetch(`http://localhost:5000/${team}/${id}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        // Reset the new task state
        setNewTask({
          number: '',
          title: '',
          description: '',
          deadline: '',
        
          status: 'Not Started',
        });
        setShowModal(false);

        // Fetch the updated project data
        fetch(`http://localhost:5000/${team}/${id}`)
          .then((response) => response.json())
          .then((data) => setProject(data));
      } else {
        console.error('Failed to add task');
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
        {project.name}
      </h2>
      <p className="text-gray-600 mb-4">{project.description}</p>
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Team Members</h3>
        <ul>
          {project.members.map((member) => (
            <li key={member.it} className="text-gray-700">
              {member.name}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">Tasks</h3>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
              <th className="px-4 py-2">Number</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Assigned To</th>
              <th className="px-4 py-2">Deadline</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {project.tasks.map((task) => (
              <tr key={task.number} className="odd:bg-gray-100 even:bg-white">
                <td className="px-4 py-2 border">{task.number}</td>
                <td className="px-4 py-2 border">{task.title}</td>
                <td className="px-4 py-2 border">
                  {project.members.find((member) => member.it === task.assignedTo)?.name}
                </td>
                <td className="px-4 py-2 border">{task.deadline}</td>
                <td className="px-4 py-2 border">
                  <span
                    className={`px-2 py-1 rounded-full font-bold bg-white ${
                      task.status === 'In Progress'
                        ? 'bg-yellow-200 text-yellow-800'
                        : task.status === 'Completed'
                        ? 'bg-green-200 text-green-800'
                        : 'bg-red-200 text-red-400'
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button onClick={() => setShowModal(true)} className="mt-4">
        Add Task
      </Button>

{/* add modal open a form  */}
    
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>Add New Task</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="number" value="Task Number" />
              </div>
              <TextInput
                id="number"
                name="number"
                value={newTask.number}
                onChange={handleInputChange}
                type="number"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="title" value="Task Title" />
              </div>
              <TextInput
                id="title"
                name="title"
                value={newTask.title}
                onChange={handleInputChange}
                type="text"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="description" value="Task Description" />
              </div>
              <Textarea
                id="description"
                name="description"
                value={newTask.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="deadline" value="Deadline" />
              </div>
              <TextInput
                id="deadline"
                name="deadline"
                value={newTask.deadline}
                onChange={handleInputChange}
                type="date"
                required
              />
            </div>
           
            <div>
              <div className="mb-2 block">
                <Label htmlFor="status" value="Status" />
              </div>
              <Select
                id="status"
                name="status"
                value={newTask.status}
                onChange={handleInputChange}
                required
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </Select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="failure" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button color="success" onClick={handleAddTask}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProjectDetails;