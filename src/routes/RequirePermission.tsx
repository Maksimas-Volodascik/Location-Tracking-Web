import { Navigate, Outlet } from "react-router-dom";
import type { Permissions } from "../types/permissions";
import { useAuth } from "../contexts/AuthContext";

export function RequirePermission({ permission }: { permission: Permissions }) {
  const { can } = useAuth();
  if (!can(permission)) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}
