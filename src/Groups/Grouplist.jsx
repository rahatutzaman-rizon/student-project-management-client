import { Link } from "react-router-dom";

const Grouplist = ({groups}) => {
    const {_id,group}=groups;

    return (
        <div className="bg-gradient-to-r from-teal-300 to-sky-300 p-4 mb-4 rounded-md shadow-md text-black">
        <p className="text-lg font-bold">ID: {_id}</p>
        <p className="text-sm">Name: {group}</p>
        <Link to={`/group/${group}`}>
        <button className="mt-2 bg-gradient-to-r from-teal-500 to-sky-500 px-4 py-2 rounded-md text-white">
          View Details
        </button>
      </Link>
      </div>
    );
};

export default Grouplist;