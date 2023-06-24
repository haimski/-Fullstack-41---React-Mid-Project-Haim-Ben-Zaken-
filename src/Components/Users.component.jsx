import { useEffect, useState } from 'react'
import { getAllUsers } from '../Utils/UsersApi'
import { userServiceUrl } from '../Utils/Consts'
import UserComponent from './User.component';

function UsersComponent() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] =  useState(users);
    const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const getUsers = async () => {
        const {data: usersData} = await getAllUsers(userServiceUrl);

        setUsers(usersData);
        setFilteredUsers(usersData);
    };
    getUsers();
  },[]);

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

  return (
    <>
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
                    <UserComponent user={user} key={index} />
                )
            })
        }
      </div>
    </>
  )
}

export default UsersComponent
