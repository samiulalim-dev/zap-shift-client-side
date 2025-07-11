// src/routes/AdminRoute.jsx

import { Navigate } from "react-router";
import LoadingSpinner from "../../Components/Loading/LoadingSpinner";
import useAdmin from "../../Hooks/useAdmin/useAdimin";

const AdminRoute = ({ children }) => {
  const { isAdmin, isPending } = useAdmin();

  if (isPending) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (!isAdmin) {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
};

export default AdminRoute;
