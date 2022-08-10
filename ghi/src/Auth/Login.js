import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Login = () => {
    let { loginUser } = useContext(AuthContext);
    return (
        <div className="login-signup-parent">
            <div className="shadow p-4 mt-4 login-signup">
                <h1>Login</h1>
                <form onSubmit={loginUser}>
                    <div className="form-floating mb-3">
                        <input className="form-control"
                            type="text" name="username"
                            placeholder="Enter Username"
                            minLength={6}
                            maxLength={25}
                        />
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input className="form-control"
                            type="password" name="password"
                            placeholder="Enter Password"
                            minLength={8}
                            maxLength={25}
                        />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button className="btn btn-success" type="submit">Login</button>
                </form>
                <div className='mt-2'>
                    Don't have an account? <a className="login-signup-link-text-color" href="/signup">Sign up here</a>
                </div>
            </div>
        </div>
    )
}

export default Login
