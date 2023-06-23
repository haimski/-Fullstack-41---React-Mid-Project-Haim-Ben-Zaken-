import { useEffect, useState } from 'react'
import { getAllUsers } from '../Utils/UsersApi'
import { userServiceUrl } from '../Utils/Consts'

function UsersComponent() {
    const [users, setUsers] = useState([]);
    
  useEffect(() => {
    const getUsers = async () => {
        const {data} = await getAllUsers(userServiceUrl);

        console.log(data);
    };
    getUsers();
  },[])

  return (
    <>
      <div>User component</div>
    </>
  )
}

export default UsersComponent
