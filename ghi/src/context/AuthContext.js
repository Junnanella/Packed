import { createContext, useState, useEffect, useCallback } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

// this component handles authenticating users and passes
// user data and auth credentials to all components in 
// browser router using Context
export const AuthProvider = ({ children }) => {

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

    // this function handles the sending of user data to the backend
    // to ensure they are authenticated
    // arguments: the envent containing form data OR signupData passed
    // from signup
    let loginUser = async (e, signupData = null) => {
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
            alert("Invalid username or password");
        }
    }

    let logoutUser = useCallback(() => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem("authTokens")
        navigate("/")
    }, [navigate])

    // this function is run every 29 minutes to update a users token or log them out if
    // the refresh token is expired
    let updateToken = useCallback(async () => {
        const url = `${process.env.REACT_APP_DJANGO_PACKING_LISTS}/auth/token/refresh/`;

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

    // this data is available to all child components
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
        // this ensures that useeffect is run every 29 minutes
        // access tokens expire every 30 minutes
        const twentyNineMinutes = 1000 * 60 * 29;
        let interval = setInterval(() => {
            if (authTokens) {
                updateToken();
            }
        }, twentyNineMinutes)
        return () => clearInterval(interval);

    }, [authTokens, loading, updateToken])


    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
}

export const MockAuthProvider = ({ children }) => {
    const fakeContextData = {
        user: {},
        authTokens: [],
        loginUser: () => { },
        logoutUser: () => { },
    };

    return (
        <AuthContext.Provider value={fakeContextData}>
            {children}
        </AuthContext.Provider>
    );
};
