import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'


const TestComponent = () => {
  let {name} = useContext(AuthContext);
  return (
    <div className="container col-4">
        <p>Hi, {name}</p>
    </div>
  )
}

export default TestComponent
