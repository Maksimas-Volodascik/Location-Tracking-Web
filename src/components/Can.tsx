import { useAuth } from "../contexts/AuthContext";
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
  const { can } = useAuth();
  return <>{can(permission) ? children : fallback}</>;
}
