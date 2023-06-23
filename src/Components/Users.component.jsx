import { useEffect, useState } from 'react'
import { getAllUsers } from '../Utils/UsersApi'
import { userServiceUrl } from '../Utils/Consts'
import UserComponent from './User.component';

function UsersComponent() {
    const [users, setUsers] = useState([]);
    
  useEffect(() => {
    const getUsers = async () => {
        const {data: usersData} = await getAllUsers(userServiceUrl);

        //console.log(data);
        setUsers(usersData);
    };
    getUsers();
  },[])

  return (
    <>
      <div className="users-panel">
        <div className="filter-user">
            <label htmlFor="">Search </label>
            <span>
                <input type="text" />
            </span>
            <button>Add</button>
        </div>
        {
            users.map((user, index) => {
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
