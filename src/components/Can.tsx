import { usePermissions } from "../contexts/PermissionsContext";
import type { Permissions } from "../types/permissions";

export function Can({
  permission,
  children,
  fallback = null,
}: {
  permission: Permissions;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { can } = usePermissions();
  return <>{can(permission) ? children : fallback}</>;
}
