import { Link } from "react-router-dom";

const Grouplist = ({groups}) => {
    const {group}=groups;
    //const uniqueGroups = group.filter((grp, index, arr) => arr.findIndex(g => g.group === grp.group) === index);

    console.log(groups);
    return (
        <div className="bg-gradient-to-r from-teal-300 to-sky-300 p-4 mb-4 rounded-md shadow-md text-black">
      
        <p className="text-xl text-center text-bold">Name of Group: {group}</p>
        <Link to={`/group/${group}`}>
        <button className="mt-2  ml-24 text-center bg-gradient-to-r from-teal-500 to-sky-500 px-4 py-2 rounded-md text-white">
          View Details
        </button>
      </Link>
      </div>
    );
};

export default Grouplist;