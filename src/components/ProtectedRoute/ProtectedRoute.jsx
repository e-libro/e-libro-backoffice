import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ProtectedRoute = ({children}) => {
  const { authState } = useAuth();
  //
{console.log(authState.authenticated)}
  if (!authState.authenticated)  {
    return <Navigate to="/" />;
  }
  return children;
}

export default ProtectedRoute;
