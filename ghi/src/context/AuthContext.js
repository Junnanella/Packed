import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export default AuthContext;


export const AuthProvider = ({children}) => {
    let [user, setUser] = useState(null);
    let [authTokens, setAuthTokens] = useState(null);

    let loginUser = async (e) => {
        e.preventDefault();
        
        const url = "http://localhost:8005/auth/token"
        const data = {"username": null, "password": null}
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        }
        const response = await fetch(fetchConfig)
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
