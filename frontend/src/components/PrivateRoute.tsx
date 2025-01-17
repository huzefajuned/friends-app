import React from "react";

import { Navigate } from "react-router-dom";
import useStore from "../store/useStore";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useStore();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
