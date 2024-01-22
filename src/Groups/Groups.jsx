import { useEffect, useState } from "react";
import Grouplist from "./Grouplist";


const Groups = () => {

    const [groups, setGroups] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/member")
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                setGroups(data);
            });
    }, []);

    const uniqueGroups = groups.filter((grp, index, arr) => arr.findIndex(g => g.group === grp.group) === index);
     console.log(uniqueGroups);
    return (
        <div>
           
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-16 gap-8 my-4 py-10 ml-4 mr-4'>
            {
                uniqueGroups.map((groups)=>
                <Grouplist
                key={groups.id}
                groups={groups}></Grouplist>
           
            )
            
            } 

            
       </div>
        </div>
    );
};

export default Groups;