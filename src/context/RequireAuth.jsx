import { Navigate, useLocation } from "react-router-dom";
import useAuth from "./useAuth";


const RequireAuth = ({ children }) => {
  const { currentUser } = useAuth();
  const Location = useLocation();
  if(!currentUser) {
    return (<Navigate to="/login" state={{ path: Location.pathname }} />)
  }
  return children;
};

export default RequireAuth;