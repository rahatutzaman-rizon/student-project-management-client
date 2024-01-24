import { Link } from "react-router-dom";

const Grouplist = ({groups}) => {

    const {group,professor}=groups;
    //const uniqueGroups = group.filter((grp, index, arr) => arr.findIndex(g => g.group === grp.group) === index);

    return (
        <div className="bg-gradient-to-r from-teal-300 to-sky-200 p-4 mb-4 rounded-md shadow-md text-black">
      
        <p className="text-xl font-bold text-bold text-center"> {professor}</p>
        <br />
        <Link to={`/group/${group}`}>
 
        <button className="mt-2  ml-24 text-center bg-gradient-to-r from-teal-600 to-pink-600 px-4 py-2 rounded-md text-white">
          View Details
        </button>
      </Link>
      </div>
    );
};

export default Grouplist;