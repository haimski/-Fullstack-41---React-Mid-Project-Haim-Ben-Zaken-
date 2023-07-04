import { useState } from "react";
import { updateTodo } from "../Utils/TodosApi";
import { todosServiceUrl } from "../Utils/Consts";

const TodosComponent = ({
        task
    }) => {
        const [taskStatus, setTaskstatus] = useState(task.completed)

    const updateTaskStatus = async (task) => {
        const dataToUpdate = {
            completed: true
        }
        const {data} = await updateTodo(todosServiceUrl, task.id, dataToUpdate);
        console.log(data);
        setTaskstatus(data.completed);
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
                        <button onClick={() => updateTaskStatus(task)}>Mark Completed</button>
                    </div>
                </li>
            </>
    )
}

export default TodosComponent