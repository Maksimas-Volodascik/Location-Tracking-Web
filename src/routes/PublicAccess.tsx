import { Navigate, Outlet } from "react-router-dom";
import { isTokenExpired } from "../services/authToken";
import { useAuth } from "../contexts/AuthContext";

export function PublicAccess() {
  const { token } = useAuth();
  if (token && !isTokenExpired()) {
    return <Navigate to="/" replace={true}></Navigate>;
  }
  return <Outlet />;
}
