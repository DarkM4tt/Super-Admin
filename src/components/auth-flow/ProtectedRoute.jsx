/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import LoadingAnimation from "../common/LoadingAnimation";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null)
    return <LoadingAnimation width={50} height={50} />;
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
