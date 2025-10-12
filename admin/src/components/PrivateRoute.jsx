import { Navigate } from "react-router-dom";
import { isAuthenticated, isAdmin } from "../utils/auth";


const PrivateRoute = ({ children }) => {
    if (!isAuthenticated() || !isAdmin()) {
        return <Navigate to='/login' replace/>
    }
    return children;
}

export default PrivateRoute
