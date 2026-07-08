import { Navigate, Outlet } from "react-router-dom";
import { isTokenExpired } from "../../services/tokenService";

export function PrivateAccess() {
  if (isTokenExpired()) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  return <Outlet />;
}
