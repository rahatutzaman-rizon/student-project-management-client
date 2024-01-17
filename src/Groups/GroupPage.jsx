
import { useLoaderData, useParams } from 'react-router-dom';

import { DashboardLayout } from './Dashboard/DashboardLayout';



const GroupPage = () => {
    const member=useLoaderData();
    console.log(member)
    const {id}=useParams();
    return (
        <div>
            this is specific page{id}
          {member.map(task => (
      <DashboardLayout key={task.id} task={task} />
    ))}
            
           
        </div>
    );
};

export default GroupPage;