import React, { useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import LoadingSpinner from "../Components/Loading/LoadingSpinner";
import { Navigate, useLocation } from "react-router";
import { use } from "react";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();
  // console.log(location);
  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }}></Navigate>;
  }
  return children;
};

export default PrivateRoute;
