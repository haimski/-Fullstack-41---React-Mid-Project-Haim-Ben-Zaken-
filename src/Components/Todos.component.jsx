import { useEffect, useState } from "react";
import { updateTodo } from "../Utils/TodosApi";
import { todosServiceUrl } from "../Utils/Consts";

const TodosComponent = ({
        task,
        updateTaskStatusState
    }) => {
        const [taskStatus, setTaskStatus] = useState(task.completed);

        useEffect(() => {
            setTaskStatus(task.completed);
        }, [task])

    const updateTaskStatus = async (task) => {
        const dataToUpdate = {
            completed: true
        }
        const {data} = await updateTodo(todosServiceUrl, task.id, dataToUpdate);
        setTaskStatus(data.completed);
        updateTaskStatusState(data)
    }

    return (
            <>
                <li className="user-items-list-item">
                    <div className="user-items-list-item-title">
                        <span>Title:</span>
                        <span>{task.title}</span>
                    </div>
                    <div className="user-items-list-item-status">
                        <span>Completed:</span>
                        <span>{taskStatus.toString()}</span>
                    </div>
                    <div className="user-items-list-item-status-btn">
                        <button className={taskStatus ? 'completed' : ''} onClick={() => updateTaskStatus(task)}>Mark Completed</button>
                    </div>
                </li>
            </>
    )
}

export default TodosComponent