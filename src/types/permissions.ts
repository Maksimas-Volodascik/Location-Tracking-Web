export type Role = "demo" | "user" | "admin";

export type Permissions =
  | "view:dashboard"
  | "view:devices"
  | "view:users"
  | "create:users"
  | "create:devices";
// add more permissions later

export const Role_Permissions: Record<Role, Permissions[]> = {
  admin: [
    "view:dashboard",
    "view:devices",
    "view:users",
    "create:users",
    "create:devices",
  ],
  user: ["view:dashboard", "view:devices", "view:users"],
  demo: ["view:dashboard"],
};

export const Tabs = [
  { path: "/dashboard", permission: "view:dashboard" },
  { path: "/devices", permission: "view:devices" },
  { path: "/users", permission: "view:users" },
];
