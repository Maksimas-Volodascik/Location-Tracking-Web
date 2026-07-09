import { Navigate, Outlet } from "react-router-dom";
import type { Permissions } from "../types/permissions";
import { usePermissions } from "../contexts/PermissionsContext";

export function RequirePermission({ permission }: { permission: Permissions }) {
  const { can } = usePermissions();
  if (!can(permission)) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}
