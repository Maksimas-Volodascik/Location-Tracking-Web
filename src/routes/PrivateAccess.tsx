import { Navigate, Outlet } from "react-router-dom";
import { isTokenExpired } from "../services/authToken";
import { useAuth } from "../contexts/AuthContext";

export function PrivateAccess() {
  const { token } = useAuth();
  if (isTokenExpired() || !token) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  return <Outlet />;
}
