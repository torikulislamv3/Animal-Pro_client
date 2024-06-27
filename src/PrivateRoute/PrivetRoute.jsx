import { useContext } from "react";
import { AuthContext } from "../Component Files/Provider/AuthProvider";
import { Navigate } from "react-router-dom";

const PrivetRoute = ({children}) => {
    // const location = useLocation()
    const {user} = useContext(AuthContext);
    if(user){
        return children;
    }
    return <Navigate to="/login"></Navigate>
};

export default PrivetRoute;