import { createContext, useState, useEffect, useCallback } from "react";
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


    let loginUser = async (e, signupData=null) => {
        let params = {}
        if (signupData) {
            params = {
                "username": signupData.username,
                "password": signupData.password,
            }
        } else {
            e.preventDefault();
            params = {
                "username": e.target.username.value,
                "password": e.target.password.value,
            }
        }
        
        const url = `${process.env.REACT_APP_DJANGO_PACKING_LISTS}/auth/token/`;

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

    let logoutUser = useCallback(() => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem("authTokens")
        navigate("/")
    }, [navigate])

    let updateToken = useCallback(async () => {
        console.log("Updated access token (if user inactive, automatically done every 29 minutes)")
        const url = `${process.env.REACT_APP_DJANGO_PACKING_LISTS}/auth/token/refresh/`;
        console.log("url: ", url)
        const domain = /https:\/\/[^/]+/;
        const basename = process.env.PUBLIC_URL.replace(domain, '');
        console.log("basename: ", basename)

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
            if (localStorage.getItem("authTokens")) {
                logoutUser();
            }
        }

        if (loading) {
            setLoading(false);
        }
    }, [authTokens?.refresh, loading, logoutUser])

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

    },[authTokens, loading, updateToken])

    
    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
}
