import { Navigate } from "react-router";
import LoadingSpinner from "../../Components/Loading/LoadingSpinner";
import useRider from "../../Hooks/useRider/useRider";

const RiderRoute = ({ children }) => {
  const { isRider, isLoading } = useRider();

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (!isRider) {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
};

export default RiderRoute;
