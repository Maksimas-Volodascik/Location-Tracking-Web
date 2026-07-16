import { Navigate, Outlet } from "react-router-dom";
import { isTokenExpired } from "../services/authToken";

export function PrivateAccess() {
  if (isTokenExpired()) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  return <Outlet />;
}
