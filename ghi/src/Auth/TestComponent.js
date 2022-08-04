import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'

// 🚨
const TestComponent = () => {
  let {user, authTokens} = useContext(AuthContext);
  console.log(user)

  async function fetchData() {
    const url = `${process.env.REACT_APP_DJANGO_PACKING_LISTS}/api/packing_lists/`;
    const fetchConfig = {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + String(authTokens?.access),
      }
    };
    const response = await fetch(url, fetchConfig)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
    }
  }

  return (
    <div className="container col-4">
      {user && <p>Hi, {user.username}</p>}
      <button onClick={fetchData}>Get data!</button>
    </div>
  )
}

export default TestComponent
