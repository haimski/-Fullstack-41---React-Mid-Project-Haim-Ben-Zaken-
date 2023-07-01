import { updateTodo } from "../Utils/TodosApi";
import { todosServiceUrl } from "../Utils/Consts";

const TodosComponent = ({currentUser, todos}) => {
    const updateTaskStatus = async (task) => {
        const dataToUpdate = {
            completed: true
        }
        const {data} = await updateTodo(todosServiceUrl, task.id, dataToUpdate);
        console.log(data);
    }

    return (
            <>
                <div className={todos.length > 0 ? 'user-items set-border' : 'user-items'}>
                    <div className="user-items-title">
                        <div className="title-row">
                            <span>Todos - User {currentUser && currentUser.id}</span>
                            <span><button>Add</button></span>
                        </div>
                        <ul className="user-items-list">
                            {
                                todos && todos.map((task, index) => {
                                    if (index < 3) {
                                        return (
                                            <li className="user-items-list-item" key={index}>
                                                <div className="user-items-list-item-title">
                                                    <span>Title:</span>
                                                    <span>{task.title}</span>
                                                </div>
                                                <div className="user-items-list-item-status">
                                                    <span>Completed:</span>
                                                    <span>{task.completed.toString()}</span>
                                                </div>
                                                <div className="user-items-list-item-status-btn">
                                                    <button onClick={() => updateTaskStatus(task)}>Mark Completed</button>
                                                </div>
                                            </li>
                                        )
                                    } else {
                                        return null
                                    }
                                })
                            }
                        </ul>
                    </div>
                </div>
            </>
    )
}

export default TodosComponent