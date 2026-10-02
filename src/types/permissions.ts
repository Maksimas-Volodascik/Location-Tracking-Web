export const Roles = ["Demo", "User", "Admin"];
export type Role = (typeof Roles)[number];

export type Permissions =
  | "view:admin-dashboard"
  | "view:dashboard"
  | "view:devices"
  | "view:users"
  | "edit:users"
  | "edit:devices"
  | "delete:users"
  | "delete:devices"
  | "create:objects";
// add more permissions later

export const Role_Permissions: Record<Role, Permissions[]> = {
  admin: [
    "view:admin-dashboard",
    "view:dashboard",
    "view:devices",
    "view:users",
    "create:objects",
    "delete:devices",
    "delete:users",
    "edit:devices",
    "edit:users",
  ],
  user: ["view:dashboard", "view:devices", "view:users", "create:objects"],
  demo: ["view:dashboard"],
};
