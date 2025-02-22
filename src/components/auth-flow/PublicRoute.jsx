import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

// eslint-disable-next-line react/prop-types
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) return <div>Loading...</div>;
  return !isAuthenticated ? children : <Navigate to="/home" />;
};

export default PublicRoute;
