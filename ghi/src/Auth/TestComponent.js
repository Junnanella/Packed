import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'


const TestComponent = () => {
  let {user} = useContext(AuthContext);
  console.log(user)
  return (
    <div className="container col-4">
      {user && <p>Hi, {user.username}</p>}
    </div>
  )
}

export default TestComponent
