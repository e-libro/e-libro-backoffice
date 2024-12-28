import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Spinner } from "react-bootstrap";
import AuthenticatedApp from "../AuthenticatedApp/AuthenticatedApp";

const ProtectedRoute = () => {
  const { authState } = useAuth();

  if (authState.loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Cargando...</p>
      </div>
    );
  }
  {
    console.log(authState.user);
  }

  return authState.authenticated ? <AuthenticatedApp /> : <Navigate to="/" />;
};

export default ProtectedRoute;
