import { Navigate, Outlet } from "react-router-dom";
import { usePermissions } from "../../contexts/PermissionsContext";
import type { Permissions } from "../../types/permissions";

export function RequirePermission({ permission }: { permission: Permissions }) {
  const { can } = usePermissions();
  if (!can(permission)) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}
