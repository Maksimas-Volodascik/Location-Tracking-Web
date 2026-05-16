import { getAccessToken, isTokenExpired } from "./tokenService";
import { Navigate, Outlet } from "react-router-dom";

export function PublicAccess() {
  if (!isTokenExpired()) {
    return <Navigate to="/" replace={true}></Navigate>;
  }

  return <Outlet />;
}

export function PrivateAccess() {
  if (isTokenExpired()) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  return <Outlet />;
}
