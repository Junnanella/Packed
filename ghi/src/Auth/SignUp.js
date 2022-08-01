import React from 'react'

const SignUp = () => {
  return (
    <div className="container col-4">
        <div className="shadow p-4 mt-4">
            <h1>Sign Up</h1>
            <form>
                <div className="form-floating mb-3">
                    <input className="form-control" type="email" name="email" placeholder="Enter Email" />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="form-floating mb-3">
                    <input className="form-control" type="text" name="username" placeholder="Enter Username" />
                    <label htmlFor="username">Username</label>
                </div>
                <div className="form-floating mb-3">
                    <input className="form-control" type="password" name="password" placeholder="Enter Password" />
                    <label htmlFor="password">Password</label>
                </div>
                <button className="btn btn-success" type="submit">Sign Up</button>
            </form>
        </div>
    </div>
  )
}

export default SignUp
