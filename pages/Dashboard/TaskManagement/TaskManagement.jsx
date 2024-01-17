import PreviousTask from "../PreviousTask/PreviousTask";
import Modal from "../Modal/Modal";
import TaskDetails from "../TaskDetails/TaskDetails";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from "react-dnd";

const TaskManagement = () => {

    return (
        <div className="px-12">
            <h1 className="text-center font-bold text-xl md:text-2xl lg:text-3xl py-6">Task Management Dashboard</h1>
            <Modal />
            <DndProvider backend={HTML5Backend}>
                <PreviousTask></PreviousTask>
            </DndProvider>
            <TaskDetails />
        </div>
    );
};

export default TaskManagement;