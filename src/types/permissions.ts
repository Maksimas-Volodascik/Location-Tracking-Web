export const Roles = ["demo", "user", "manager", "admin"] as const;
export type Role = (typeof Roles)[number];

export type Permissions =
  | "view:admin-dashboard"
  | "view:dashboard"
  | "view:devices"
  | "view:users"
  | "view:workspaces"
  | "create:devices"
  | "create:users"
  | "edit:devices"
  | "edit:users"
  | "edit:workspaces"
  | "delete:devices"
  | "delete:users";

const ManagerPermissions: Permissions[] = [
  "view:dashboard",
  "view:devices",
  "view:users",
  "view:workspaces",
  "create:devices",
  "create:users",
  "edit:devices",
  "edit:users",
  "edit:workspaces",
  "delete:devices",
  "delete:users",
];

export const Role_Permissions: Record<Role, Permissions[]> = {
  admin: [...ManagerPermissions, "view:admin-dashboard"],
  manager: ManagerPermissions,
  user: [
    "view:dashboard",
    "view:devices",
    "view:users",
    "view:workspaces",
    "create:devices",
  ],
  demo: ["view:dashboard"],
};
