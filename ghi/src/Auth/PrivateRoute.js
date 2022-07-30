import {Route, Navigate} from 'react-router-dom';

const PrivateRoute = ({children}) => {
    console.log("private route working");
    const authenticated = false
    return (
       !authenticated ? <Navigate to="/login" /> : children
    )
}

export default PrivateRoute;
