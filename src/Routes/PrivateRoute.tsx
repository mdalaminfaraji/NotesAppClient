import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";



const PrivateRoute = ({ children }:any) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if(loading){
        return <progress className="progress w-full"></progress>
    }

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;