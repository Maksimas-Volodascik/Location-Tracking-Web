import { Navigate, Outlet } from "react-router-dom";
import { isTokenExpired } from "../services/tokenService";

export function PublicAccess() {
  if (!isTokenExpired()) {
    return <Navigate to="/" replace={true}></Navigate>;
  }

  return <Outlet />;
}
