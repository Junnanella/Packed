import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export default AuthContext;


export const AuthProvider = ({children}) => {
    let [user, setUser] = useState(null);
    let [authTokens, setAuthTokens] = useState(null);

    let loginUser = async (e) => {
        e.preventDefault();
        
        const url = "http://localhost:8005/auth/token/"
        const params = {
            "username": e.target.username.value,
            "password": e.target.password.value,
        }
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json",
            }
        }
        const response = await fetch(url, fetchConfig)
        const data = await response.json()

        if (response.ok) {
            console.log(data)
            // setAuthTokens(data)
            // setUser(data.access)
        } else {
            alert("Something went wrong")
        }
    }

    const contextData = {
        loginUser: loginUser
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
}
