import { useEffect, useState } from 'react'
import { getAllUsers } from '../Utils/UsersApi'
import { getTodoByUserId } from '../Utils/TodosApi';
import { getPostByUserId } from '../Utils/PostsApi';
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

  useEffect(() => {
    const getUsers = async () => {
        const {data: usersData} = await getAllUsers(userServiceUrl);

        setUsers(usersData);
        setFilteredUsers(usersData);
    };
    getUsers();
  });

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

  // get todos by user id
  const getTodoDataByUserId = async (userId) => {
    const {data: userTodosData} = await getTodoByUserId(todosServiceUrl, userId);
    //console.log(userTodosData);
    setUserTodos(userTodosData);
  }

  // get post by user id
  const getPostsDataByUserId = async (userId) => {
    const {data: userPostsData} = await getPostByUserId(postsServiceUrl, userId);
    //console.log(userPostsData);
    setUserPosts(userPostsData);
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
                <button>Add</button>
            </div>
            {
                filteredUsers.map((user, index) => {
                    return (
                        <UserComponent 
                            user={user} 
                            key={index} 
                            getTodoDataByUserId={getTodoDataByUserId}
                            getPostsDataByUserId={getPostsDataByUserId}
                            selectedUserId={selectedUserId}
                            setSelectedUserId={setSelectedUserId}
                            setCurrentUser={setCurrentUser}
                            currentUser={currentUser}
                            setShowRightPanel={setShowRightPanel}
                            showRightPanel={showRightPanel}
                            userTodos={userTodos} />
                    )
                })
            }
        </div>
    </div>
    <div className='right-col'>
            {showRightPanel && <div className="user-data-panel">
                {currentUser &&<TodosComponent currentUser={currentUser} todos={userTodos} />}
                {currentUser && <PostsComponent currentUser={currentUser} posts={userPosts} />}
            </div>}
    </div>
      
    </>
  )
}

export default UsersComponent
