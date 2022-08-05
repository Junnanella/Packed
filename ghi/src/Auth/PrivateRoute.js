import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

// wrapping a route in this ensures that only authenticated
// users can access the component
const PrivateRoute = ({ children }) => {
    let { user } = useContext(AuthContext);
    return (
        !user ? <Navigate to="/login" /> : children
    )
}

export default PrivateRoute;
