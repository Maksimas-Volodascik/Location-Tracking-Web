import { createContext, useContext, useMemo } from "react";
import {
  Role_Permissions,
  type Permissions,
  type Role,
} from "../types/permissions";
import { getRole } from "../services/tokenService";

interface PermissionsValue {
  role: Role;
  can: (p: Permissions) => boolean;
}

const PermissionsContext = createContext<PermissionsValue | null>(null);

export function PermissionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const value = useMemo<PermissionsValue>(() => {
    const role = getRole()?.toLowerCase() as Role;
    const perms = new Set(Role_Permissions[role] ?? []); //create new set of permissions
    return { role, can: (p) => perms.has(p) };
  }, []);

  return (
    <PermissionsContext.Provider value={value}>
      {children}
    </PermissionsContext.Provider>
  );
}

export function usePermissions() {
  const ctx = useContext(PermissionsContext);
  if (!ctx)
    throw new Error("usePermissions must be used within PermissionsProvider");
  return ctx;
}
