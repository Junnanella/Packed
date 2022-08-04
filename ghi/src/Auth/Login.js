import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Login = () => {
    let { loginUser } = useContext(AuthContext);
    return (
        <div className="container col-4">
            <div className="shadow p-4 mt-4">
                <h1>Login</h1>
                <form onSubmit={loginUser}>
                    <div className="form-floating mb-3">
                        <input className="form-control" type="text" name="username" placeholder="Enter Username" />
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input className="form-control" type="password" name="password" placeholder="Enter Password" />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button className="btn btn-success" type="submit">Login</button>
                </form>
                <div className='mt-2'>
                    Don't have an account? <a href="/signup">Sign up</a>
                </div>
            </div>
        </div>
    )
}

export default Login
