import { useState } from 'react'
import './App.scss'
import UsersComponent from './Components/Users.component'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='left-col'>
      <UsersComponent />
    </div>
    <div className='right-col'>

    </div>
      
    </>
  )
}

export default App
