
import Task from './Task.js'
const Tasks = ({tasks,onDelete,onToggle}) => {
    
    
    return (
        <>
            {tasks.map((task) =>
                <Task onDelete={onDelete} key={task.id} task={task} toggle={onToggle} />
            )}
        </>);
};
export default Tasks;