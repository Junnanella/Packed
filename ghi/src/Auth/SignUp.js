import React from 'react'
import { useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import "../MainPages/pages.css"

const SignUp = () => {
    const { loginUser } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function submitSignUp(e) {
        e.preventDefault();

        const signupUrl = `${process.env.REACT_APP_DJANGO_PACKING_LISTS}/auth/signup/`;
        const params = {
            "username": username,
            "password": password,
            "email": email,
        }
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json",
            }
        }
        const response = await fetch(signupUrl, fetchConfig);

        if (response.ok) {
            const sendToLogin = {
                password: password,
                username: username,
            };
            loginUser({}, sendToLogin);
        } else {
            alert("Something went wrong");
        }
    }

    const changeEmail = (e) => {
        setEmail(() => e.target.value);
    };
    const changeUsername = (e) => {
        setUsername(() => e.target.value);
    };
    const changePassword = (e) => {
        setPassword(() => e.target.value);
    };


    return (
        <div className="login-signup-parent">
            <div className="shadow p-4 mt-4 login-signup">
                <h1>Sign Up</h1>
                <form onSubmit={submitSignUp}>
                    <div className="form-floating mb-3">
                        <input
                            className="form-control"
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={changeEmail}
                        />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            className="form-control"
                            type="text" name="username"
                            placeholder="Enter Username"
                            value={username}
                            onChange={changeUsername}
                            minLength={6}
                            maxLength={25}
                        />
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            className="form-control"
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            onChange={changePassword}
                            value={password}
                            minLength={8}
                            maxLength={25}
                        />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button className="btn btn-success" type="submit">Sign Up</button>
                </form>
                <div className='mt-2'>
                    Already have an account? <a className="login-signup-link-text-color" href="/login">Sign in here</a>
                </div>
            </div>
        </div>
    )
}

export default SignUp
