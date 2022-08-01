import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;


export const AuthProvider = ({children}) => {

    let [loading, setLoading] = useState(true);
    let [authTokens, setAuthTokens] = useState(() => {
        return (
            localStorage.getItem("authTokens") ?
                JSON.parse(localStorage.getItem("authTokens"))
            :
                null
        )
    });
    let [user, setUser] = useState(() => {
        return (
            localStorage.getItem("authTokens") ?
                jwt_decode(localStorage.getItem("authTokens"))
            :
                null      
        )
    });

    let navigate = useNavigate()

    let loginUser = async (e) => {
        e.preventDefault();
        
        const url = "http://localhost:8005/auth/token/";
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
        const response = await fetch(url, fetchConfig);
        const data = await response.json();

        if (response.ok) {
            setAuthTokens(data);
            const decodedToken = jwt_decode(data.access);
            setUser(decodedToken);
            localStorage.setItem("authTokens", JSON.stringify(data));
            navigate("/")
        } else {
            alert("Something went wrong");
        }
    }

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem("authTokens")
        navigate("/")
    }

    let updateToken = async () => {
        console.log("Updated token (every 29 minutes)")
        const url = "http://localhost:8005/auth/token/refresh/";
        const params = {
            "refresh": authTokens?.refresh
        }
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json",
            }
        }
        const response = await fetch(url, fetchConfig);
        const data = await response.json();

        if (response.ok) {
            setAuthTokens(data);
            const decodedToken = jwt_decode(data.access);
            setUser(decodedToken);
            localStorage.setItem("authTokens", JSON.stringify(data));
        } else {
            logoutUser();
        }

        if (loading) {
            setLoading(false);
        }
    }

    const contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
    };

    useEffect(() => {
        if (loading) {
            updateToken();
        }

        const fourMinutes = 1000 * 60 * 29;
        let interval = setInterval(() => {
            if (authTokens) {
                updateToken();
            }
        }, fourMinutes)
        return () => clearInterval(interval);

    },[authTokens, loading])

    
    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
}
