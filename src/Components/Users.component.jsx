import { useState } from 'react'
import { getAllUsers } from '../Utils/UsersApi'
import { userServiceUrl } from '../Utils/Consts'

function UsersComponent() {
  const getUsers = async () => {
    const {data} = await getAllUsers(userServiceUrl);
  }

  return (
    <>
      <div>User component</div>
    </>
  )
}

export default UsersComponent
