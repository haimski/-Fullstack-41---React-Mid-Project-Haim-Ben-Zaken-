import { useEffect, useState } from 'react'
import { uniqueId } from 'lodash';
import { getAllUsers, addUser } from '../Utils/UsersApi';
import { getTodoByUserId, addTodo } from '../Utils/TodosApi';
import { getPostByUserId, addPost } from '../Utils/PostsApi';
import { userServiceUrl, todosServiceUrl, postsServiceUrl } from '../Utils/Consts'
import UserComponent from './User.component';
import TodosComponent from './Todos.component';
import PostsComponent from './Posts.component';

function UsersComponent() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] =  useState(users);
    const [searchInput, setSearchInput] = useState('');
    const [selectedUserId, setSelectedUserId] = useState(null); 
    const [userTodos, setUserTodos] = useState([]);
    const [userPosts, setUserPosts] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [showRightPanel, setShowRightPanel] = useState(false);
    const [showAddUserForm, setShowAddUserForm] = useState(false);
    const [showAddTodoForm, setShowAddTodoForm] = useState(false);
    const [showAddPostForm, setShowAddPostForm] = useState(false);
    const [newUser, setNewUser] = useState({});
    const [newTodo, setNewTodo] = useState({});
    const [newPost, setNewPost] = useState({});
    const [isUserTasksUncompleted, setIsUserTasksUncompleted] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
        const {data: usersData} = await getAllUsers(userServiceUrl);

        setUsers(usersData);
        setFilteredUsers(usersData);
    };
    getUsers();
  }, []);

  useEffect(() => {
    setIsUserTasksUncompleted(userTodos.find(task => task.completed === false));
  }, [userTodos])

  const getFilteredUsers = (e) => {
    const searchStr = e.target.value;
    setSearchInput(searchStr.toLowerCase());
    if (searchInput != '') {
        const filteredUsersList = users.filter((user) => {
            const userFName = user.name.toLowerCase(),
                  userEMail = user.email.toLowerCase();
            return userFName.includes(searchInput) || userEMail.includes(searchInput);
        });
        setFilteredUsers(filteredUsersList);
    } else {
        setFilteredUsers(users);
    }
  };

  const getTodoDataByUserId = async (userId) => {
    const {data: userTodosData} = await getTodoByUserId(todosServiceUrl, userId);
    setUserTodos(userTodosData);
  }

  const getPostsDataByUserId = async (userId) => {
    const {data: userPostsData} = await getPostByUserId(postsServiceUrl, userId);
    setUserPosts(userPostsData);
  }

  const removeUser = (userId) => {
    setFilteredUsers(filteredUsers.filter(user => user.id !== userId));
  }

  const updateTaskStatusState = (task) => {
    userTodos.forEach((todo) => {
        if (todo.id === task.id) {
            todo.completed = task.completed;
        }
    })
    setUserTodos(userTodos);
    setIsUserTasksUncompleted(userTodos.find(task => task.completed === false));
  }

  const handleAddUserSubmit = async (e) => {
    e.preventDefault();
    const {data: newUserData} = await addUser(userServiceUrl, newUser);
    setUsers([...users, newUserData]);
    setFilteredUsers([...users, newUserData]);
  }

  const handleAddTodoSubmit = async (e) => {
    e.preventDefault();
    const {data: newTodoData} = await addTodo(userServiceUrl, newTodo);
    setUserTodos([{
        userId: currentUser.id,
        id: userTodos.length,
        title: newTodoData.title,
        completed: false
    }, ...userTodos]);
  }

  const handleAddPostSubmit = async (e) => {
    e.preventDefault();
    const {data: newPostData} = await addPost(userServiceUrl, newPost);
    setUserPosts([newPostData, ...userPosts]);
  }

  const toggleNewPostForm = () => {
    setShowAddPostForm(!showAddPostForm);
  }

  return (
    <>
    <div className='left-col'>
        <div className="users-panel">
            <div className="filter-user">
                <label htmlFor="">Search </label>
                <span>
                    <input type="text" onInput={(e) => getFilteredUsers(e)} />
                </span>
                <button onClick={() => setShowAddUserForm(!showAddUserForm)}>Add</button>
            </div>
            {
                filteredUsers.map((user) => {
                    return (
                        <UserComponent 
                            user={user} 
                            key={uniqueId('user-')} 
                            getTodoDataByUserId={getTodoDataByUserId}
                            getPostsDataByUserId={getPostsDataByUserId}
                            selectedUserId={selectedUserId}
                            setSelectedUserId={setSelectedUserId}
                            setCurrentUser={setCurrentUser}
                            currentUser={currentUser}
                            setShowRightPanel={setShowRightPanel}
                            showRightPanel={showRightPanel}
                            userTodos={userTodos}
                            isUserTasksUncompleted={isUserTasksUncompleted}
                            removeUser={removeUser}
                            setShowAddTodoForm={setShowAddTodoForm} />
                    )
                })
            }
        </div>
    </div>
    <div className='right-col'>
            {showAddUserForm && <div className='add-user-form'>
                <div className="title">Add User</div>
                <form onSubmit={handleAddUserSubmit} className="add-user-form_form">
                    <div className="row">
                        <label htmlFor="name">Name:</label>
                        <input type="text" name='name' onInput={(e) => setNewUser({...newUser, name: e.target.value})} />
                    </div>
                    <div className="row">
                        <label htmlFor="email">Email:</label>
                        <input type="text" name='email' onInput={(e) => setNewUser({...newUser, email: e.target.value})} />
                    </div>
                    <div className="row buttons">
                        <input type="button" value="Cancel" onClick={(e) => setShowAddUserForm(false)} />
                        <input type="submit" value="Add" />
                    </div>
                </form>
            </div>}
            {showRightPanel &&
            <div className="user-data-panel">
                {showAddTodoForm && <div className='add-todo-form'>
                <div className="title">New Todo - User {currentUser && currentUser.id}</div>
                    <form onSubmit={handleAddTodoSubmit} className="add-user-form_form">
                        <div className="row">
                            <label htmlFor="title">Title</label>
                            <input type="text" name="title" onInput={(e) => setNewTodo({...newTodo, title: e.target.value})}/>
                        </div>
                        <div className="row buttons">
                            <input type="button" value="Cancel" onClick={() => setShowAddTodoForm(false)} />
                            <input type="submit" value="Add" />
                        </div>
                    </form>
                </div>}
                <div className={userTodos.length > 0 ? 'user-items set-border' : 'user-items'}>
                    <div className="user-items-title">
                        <div className="title-row">
                            <span>Todos - User {currentUser && currentUser.id}</span>
                            <span><button onClick={() => setShowAddTodoForm(!showAddTodoForm)}>Add</button></span>
                        </div>
                        <ul className="user-items-list">{
                        userTodos && userTodos.map((task, index) => {
                                    if (index < 3) {
                                        return <TodosComponent task={task} key={uniqueId('todos-')} updateTaskStatusState={updateTaskStatusState} />
                                    } else {
                                        return null
                                    }
                                })
                            }
                        </ul>
                    </div>
                </div>
                { showAddPostForm &&
                <div className='add-post-form'>
                    <div className="title">New Post - User {currentUser && currentUser.id}</div>
                    <form onSubmit={handleAddPostSubmit} className="add-user-form_form">
                        <div className="row">
                            <label htmlFor="title">Title:</label>
                            <input type="text" name='title' onInput={(e) => setNewPost({...newPost, title: e.target.value})} />
                        </div>
                        <div className="row">
                            <label htmlFor="body">Body:</label>
                            <input type="text" name="body" onInput={(e) => setNewPost({...newPost, body: e.target.value})} />
                        </div>
                        <div className="row buttons">
                            <input type="button" value="Cancel" onClick={() => setShowAddPostForm(false)} />
                            <input type="submit" value="Add" />
                        </div>
                    </form>
                </div>
                }
                {currentUser && <PostsComponent currentUser={currentUser} posts={userPosts} toggleNewPostForm={toggleNewPostForm} />}
            </div>}
    </div>
      
    </>
  )
}

export default UsersComponent
