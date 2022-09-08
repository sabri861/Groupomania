import { Navigate } from "react-router-dom";

const AuthGard = ({children, accountService}) => {
    if(!accountService.isLogged()){
        return  <Navigate to="/auth"/>
    }
    return children
};

export default AuthGard;