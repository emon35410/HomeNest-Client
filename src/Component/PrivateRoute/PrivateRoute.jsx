

import { Navigate, useLocation } from "react-router";

import { Atom } from "react-loading-indicators";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";



const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext)
  const location = useLocation();

  if (loading) {
    return <Atom color="#32cd32" size="medium" text="" textColor="" />
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
