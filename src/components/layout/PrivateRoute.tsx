import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ScreenLoader } from "../ui/ScreenLoader";

export const PrivateRoute = () => {
  const { isAuthenticated, status } = useAuth();

  if (status === "loading") {
    return <ScreenLoader label="Checking your session..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
