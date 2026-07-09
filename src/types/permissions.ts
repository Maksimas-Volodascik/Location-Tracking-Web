export type Role = "demo" | "user" | "admin";

export type Permissions =
  | "view:dashboard"
  | "view:devices"
  | "view:users"
  | "create:objects";
// add more permissions later

export const Role_Permissions: Record<Role, Permissions[]> = {
  admin: ["view:dashboard", "view:devices", "view:users", "create:objects"],
  user: ["view:dashboard", "view:devices", "view:users", "create:objects"],
  demo: ["view:dashboard"],
};
