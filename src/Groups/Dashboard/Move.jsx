import { Link } from "react-router-dom";

const Move = () => {


    const handleSubmit=async(e)=>{
        e.preventDefault();
    }

    return (
        <div>
             <div>
            <h1 className="text-center font-bold text-xl md:text-2xl lg:text-3xl py-6">Please select where you want to move this task</h1>
            <form className="max-w-screen-xl mx-auto" onSubmit={handleSubmit}>
                <div className="flex justify-center items-center">
                    <select name="status" className="border w-3/4 mt-12 mb-6 py-3 rounded-lg">
                        <option value="todo">TODO</option>
                        <option value="ongoing">ONGOING</option>
                        <option value="completed">COMPLETED</option>
                    </select>
                </div>
               
                <Link className=" flex justify-center items-center mt-6   text-center btn btn-success" to="/">Move</Link>
            </form>
        </div>
        </div>
    );
};

export default Move;